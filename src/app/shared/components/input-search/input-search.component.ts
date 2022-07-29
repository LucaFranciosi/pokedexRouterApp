/* import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(public pokemonSrv: PokemonService) { }



  ngOnInit(): void {
    this.searchForm = this.createForm();
    this.onChanges();
  }



  onChanges() {
    this.searchForm.get('input_search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((val: string) =>
      this.pokemonSrv.setSearchString(val.toLocaleLowerCase()));

  }


  handleReset(): void {
    this.searchForm.controls['input_search'].setValue('')
    this.pokemonSrv.setSearchString('')
  }
  createForm() {
    return new FormGroup({
      input_search: new FormControl(null, { updateOn: 'change' })
    })
  }


}
 