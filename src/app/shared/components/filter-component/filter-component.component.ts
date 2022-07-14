import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take } from 'lodash';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';

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
  currentList: Pokemon[] = []
  pokeTypesControls: FormArray;
  uniqueTypeMatrix: string[] = [];

  constructor(public fb: FormBuilder, public pokemonSrv: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonSrv.currentList.subscribe(list => this.currentList = list)
    this.filterForm = this.createForm();
    this.pokeTypesControls = this.filterForm.get('pokeTypesControls') as FormArray;
    this.onChanges()
    console.log(this.filterForm.valueChanges.subscribe(val => console.log(val)))
  }

  onCheckStateChange(event: any, index: number) {

    if (event.target.checked) {
      this.filterForm.get('pokeTypesControls').get([index]).setValue(event.target.value)
    } else {
      this.filterForm.get('pokeTypesControls').get([index]).setValue(null);

    }

  }


  retrieveType(index: number) {
    return this.pokeTypesControls.get(`${index}`).value;
  }



  onChanges() {
    this.filterForm.get('input_search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((val: string) =>
      this.pokemonSrv.setSearchString(val.toLocaleLowerCase()));

  }//} old way to set inputSearch value as filter for the pokemonlist using an Observable to feed the custom pipe 

  //this.fb.control(`${type}`)


  clear() {
    this.filterForm.controls['pokeTypesControls'].reset()
  }

  createFormArray(): FormArray {
    //set variables
    let typeMatrix: string[] = [];
    let formArray: FormArray = this.fb.array([]);
    //make subscription and manipulate the answer to create a list of types
    this.pokemonSrv.currentList.subscribe(pokemonList => {
      pokemonList.map((pokemon) => {
        typeMatrix.push(pokemon.types[0].type.name)
      })
      this.uniqueTypeMatrix = [...new Set(typeMatrix)];
      this.uniqueTypeMatrix.map(type => formArray.push(this.fb.control(null)))

    })


    return formArray;
  }



  createForm() {
    return this.fb.group({
      input_search: '',
      order: 'id',
      favourites: false,
      pokeTypesControls: this.createFormArray() as AbstractControl
    })

  }


  handleAccordionStatus(stringValue: string) {
    return this.isAccordionOpen = stringValue
  }

}





