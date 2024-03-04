import { Component, NgModule, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService, PokemonDetails, PokemonList } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pokemonList: PokemonList | undefined;
  pokemonDetails: PokemonDetails | undefined;

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.getPokemonList();
    this.getPokemonDetails(22); // Obtener detalles del Pokémon con ID 22 (ejemplo)
  }

  getPokemonList(): void {
    this.pokeapiService.getPokemonList(0, 20)
      .subscribe((data: PokemonList) => {
        this.pokemonList = data;
      });
  }

  getPokemonDetails(id: number): void {
    this.pokeapiService.getPokemonDetails(id)
      .subscribe((data: PokemonDetails) => {
        this.pokemonDetails = data;
      });
  }
  
  loadPreviousPage(): void {
    if (this.pokemonList?.previous) {
      this.getPokemonPage(this.pokemonList.previous);
    }
  }

  loadNextPage(): void {
    if (this.pokemonList?.next) {
      this.getPokemonPage(this.pokemonList.next);
    }
  }

  private getPokemonPage(url: string): void {
    this.pokeapiService.getPokemonPage(url)
      .subscribe((data: PokemonList) => {
        this.pokemonList = data;
      });
  }

  getPokemonId(url: string): string {
    return url.split('/').slice(-2, -1)[0];
  }
  getPokemonImageUrl(url: string): string {
    // Obtener el ID del Pokémon de la URL
    const pokemonId = url.split('/').slice(-2, -1)[0];
    // Construir la URL de la imagen del Pokémon
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }
}
