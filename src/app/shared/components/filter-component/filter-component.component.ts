import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject, Subscription, } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FakeService } from 'src/app/core/services/pokemon/fake/fake-service.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import sortBy from 'src/utils/js/sortBy';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  animations: [
    trigger('collapsable', [
      state('opened', style({
        height: '*',
      })),
      state('closed', style({
        height: '0',
      })),
      transition('opened<=>closed', [
        animate('0.7s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),

    ])
  ],
  styleUrls: ['./filter-component.component.scss']
})




export class FilterComponentComponent implements OnInit {

  isAccordionOpen: string = 'closed';
  filterForm: FormGroup;
  listOfTypes = new Set();
  uniqueTypeMatrix: string[] = [];
  pokeTypesControls: FormArray;
  buttonClearDisabled: boolean = true;
  buttonSelectAllDisabled: boolean = true;
  pokemonList: Pokemon[];
  currentList: Pokemon[];
  pokemonListSubject: Subject<Pokemon[]> = this.fake.getPokemonListSubject();
  currentListSubject: Subject<Pokemon[]> = this.fake.getCurrentListSubject();
  userSubject = this.auth.getUserSubject()
  subscriptions: Subscription;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public fake: FakeService
  ) {
    this.subscriptions = this.currentListSubject.subscribe(list => this.currentList = list);
    this.subscriptions.add(this.pokemonListSubject.subscribe(list => this.pokemonList = list));

  }

  ngOnInit() {

    this.filterForm = this.createForm();

    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((filterFormValue: FilterForm) => {
        this.onInputChanges(filterFormValue)
      })).subscribe()
    this.pokeTypesControls = this.filterForm.get('pokeTypesControls') as FormArray;
    this.buttonClearDisabled = false;
    this.enableDisableButton()
  }


  createFormArray(): FormArray {
    let formArray: FormArray = this.fb.array([]);
    let typeMatrix: string[] = [];
    this.pokemonListSubject.subscribe(pokemonList => {
      pokemonList.map(pokemon => typeMatrix.push(pokemon.types[0].type.name));
      this.uniqueTypeMatrix = [...new Set(typeMatrix)];
      this.uniqueTypeMatrix.map((type) => formArray.push(this.fb.control(type)))
    });

    return formArray;
  }


  createForm() {
    let group = this.fb.group({
      input_search: '',
      order: 'id',
      favourites: false,
      pokeTypesControls: this.createFormArray() as AbstractControl
    })
    return group
  }


  onInputChanges(filterFormValue: FilterForm) {

    let { order, pokeTypesControls, favourites, input_search } = filterFormValue;

    this.currentListSubject.next(sortBy(order, this.pokemonList
      .filter((pokemon: Pokemon) => input_search !== null ? pokemon.name.includes(input_search) : pokemon)
      .filter((pokemon: Pokemon) => pokeTypesControls.indexOf(pokemon.types[0].type.name) !== -1)
      .filter((pokemon: Pokemon) =>
        favourites
          ?
          this.auth.user.preferences?.indexOf(pokemon.id) !== -1
          : pokemon)
    ))

  }



  // INPUT SERVICES
  enableDisableButton() {
    this.pokeTypesControls.valueChanges.pipe(map((controlValues) => {
      let atLeastOneSelected = controlValues.filter((control: []) => control !== null).length !== 0;
      let atLeastOneEmpty = controlValues.filter((control: []) => control === null).length !== 0;
      atLeastOneSelected ? this.buttonClearDisabled = false :
        this.buttonClearDisabled = true;
      atLeastOneEmpty ? this.buttonSelectAllDisabled = false :
        this.buttonSelectAllDisabled = true
    })).subscribe()
  }

  onCheckStateChange(event: any, index: number) {
    if (event.target.checked) {
      this.pokeTypesControls.get([index]).setValue(event.target.value)
    } else {
      this.pokeTypesControls.get([index]).setValue(null);
    }
  }

  retrieveControlValue(index: number) {
    return this.pokeTypesControls.get(`${index}`).value;
  }


  //BUTTONS
  handleAccordionStatus(stringValue: string) {
    return this.isAccordionOpen = stringValue
  }

  // crea una funzione unica reset dipendente dall'event.target.id 
  clear(event: any) {
    if (event.target.id === 'close_icon') {

      this.filterForm.controls['input_search'].reset()
    } else {
      if (event.target.id === 'clear')
        for (let control of this.pokeTypesControls.controls) {
          control.reset();
        }
    }
  }

  selectAll() {
    this.uniqueTypeMatrix.map((type, index) => this.pokeTypesControls.at(index).patchValue(type))
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }



}

interface FilterForm {
  input_search: string,
  order: string,
  pokeTypesControls: string[],
  favourites: boolean;
}



