import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControlStatus, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';

@Component({
  selector: 'app-accordion-form',
  templateUrl: './accordion-form.component.html',
  styleUrls: ['./accordion-form.component.scss']
})
export class AccordionFormComponent implements OnInit {
  accordionForm: FormGroup;
  pokeTypes: FormArray;
  nestedForm: FormGroup = this.fb.group({});
  isFavourite: boolean;


  constructor(public pokemonSrv: PokemonService, private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    this.createNestedFormGroup();
    this.accordionForm = this.createFormGroup();
    this.pokeTypes = this.accordionForm.get('pokeTypes') as FormArray;
    //start the accordion app with all the checkboxes checked, even if not visibile in the UI.
    this.initCheckBoxAsCheked();
    // expose into a BehaviorSubjectValue a list of selected pokeTypes checkBox to filter from. 
    this.pokeTypeFiltering();
    // set the new value  when order radiobox changed.
    this.changeOrder();
    this.accordionForm.controls['favourites'].valueChanges.subscribe({
      next: () => {
        this.pokemonSrv.togglefavControlInputValue()
      }
    });

  }



  retrieveType(type: string) {
    return this.nestedForm.get(`${type}`).value
  }

  changeOrder() {
    return this.accordionForm.controls['order'].valueChanges.subscribe(val => {
      this.pokemonSrv.setOrder(val)
    });

  }

  initCheckBoxAsCheked() {
    return this.createListOfTypes().forEach(element => {
      this.pokemonSrv.pokeTypeFilter.next([...element])
    });
  }


  pokeTypeFiltering() {
    return this.nestedForm.valueChanges.subscribe((val) => {
      return this.pokemonSrv.pokeTypeFilter.next(Object.values(val).filter((type) => type !== null
      ))
    })
  }


  createNestedFormGroup() {
    this.createListOfTypes().subscribe(lst => lst.map(type => {
      this.nestedForm.addControl(type, this.fb.control(null))
    }))
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      order: [this.pokemonSrv.order.value],
      pokeTypes: this.fb.array([this.nestedForm]) as AbstractControl,
      favourites: [null],
    })
  }

  createListOfTypes(): Observable<string[]> {
    return new Observable<string[]>((subscriber) => {
      this.pokemonSrv.currentList.subscribe((pokemonList) => {
        subscriber.next([...new Set(pokemonList.map((pokemon) => {
          return pokemon.types[0].type.name;
        }))]);
      });
    });
  }

  clear() {
    this.pokeTypes.controls[0].reset()
  }

  onCheckStateChange(event: any) {
    if (event.target.checked) {
      this.pokeTypes.controls[0].get(event.target.value).setValue(event.target.value)
    } else {
      this.pokeTypes.controls[0].get(event.target.value).setValue(null);
    }

  }



  getFavouritePokemons(list: Pokemon[]) {
    if (list)
      list = list.filter(pokemon => { this.auth.currentUserValue.preferences?.indexOf(pokemon.id) !== -1; })
    return this.pokemonSrv.currentListsetter(list)
  }



}










/*
  onCheckStateChange(event: any) {
    if (event.target.checked) {
      this.pokeTypes.push(this.fb.control(event.target.value));
    } else {
      const index = this.pokeTypes.controls.findIndex(checkBox => checkBox.value === event.target.value);
      this.pokeTypes  .removeAt(index);
    }
 */













[]






