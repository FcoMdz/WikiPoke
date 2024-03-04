import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PokeapiService, PokemonDetails } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  miFormulario:FormGroup = this.formBuilder.group({
    nombre: new FormControl('')
  });;
  pokemon: any = {};
  constructor(private pokeapiService: PokeapiService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  searchPokemon(): void {

    this.pokeapiService.getPokemonByName(this.miFormulario?.value.nombre)
      .subscribe(result => {
        this.pokemon = result;
        if (Object.keys(this.pokemon).length !== 0) {
          this.router.navigate(['/pokemon', this.pokemon.id]);
        } else {
          this.router.navigate(['/pokemon', 0]);
        }
      });
  }
}
