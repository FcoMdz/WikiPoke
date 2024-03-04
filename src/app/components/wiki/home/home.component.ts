import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeapiService, PokemonDetails, PokemonList, PokemonType } from 'src/app/services/pokeapi.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pokemonList: PokemonList | undefined;
  pokemonDetails: PokemonDetails | undefined;
  pokemonTypes: PokemonType | undefined;
  page: number = 1;
  idPoke: number = 0;
  pokemonDetailsMap: { [url: string]: PokemonDetails } = {};
  constructor(
    private pokeapiService: PokeapiService,
    ) { }

  ngOnInit(): void {
    this.getPokemonList();
  }
/* Primer version para obtener datos
  getPokemonList(): void {
    this.pokeapiService.getPokemonList1(0, 20)
      .subscribe((data: PokemonList) => {
        this.pokemonList = data;
      });
  }*/

  getPokemonList(): void {
    this.pokeapiService.getPokemonList1(0, 20)
      .subscribe((data: PokemonList) => {
        this.pokemonList = data;
        // Cargar los detalles de cada Pokémon cuando se obtiene la lista inicial
        this.loadPokemonDetails();
      });
  }

  loadPokemonDetails(): void {
    if (this.pokemonList) {
      this.pokemonList.results.forEach(pokemon => {
        this.pokeapiService.getPokemonDetailsByUrl(pokemon.url).subscribe(details => {
          this.pokemonDetailsMap[pokemon.url] = details; // Almacena los detalles en el mapa
        });
      });
    }
  }
  getPokemonDetails(id: number): void {
    this.pokeapiService.getPokemonDetails(id).subscribe((data: PokemonDetails) => {
      this.pokemonDetails = data;
    });
  }
  getPokemonDetails2(id: number): PokemonDetails | undefined{
    var data;
    this.pokeapiService.getPokemonDetails(id)
      .subscribe((data: PokemonDetails) => {
        data = data;
      });
      return data;
  }
  
  loadPreviousPage(): void {
    if (this.pokemonList?.previous) {
      this.getPokemonPage(this.pokemonList.previous, () => {
        this.loadPokemonDetails(); // Cargar los detalles actualizados
      });
    }
  }
  
  loadNextPage(): void {
    if (this.pokemonList?.next) {
      this.getPokemonPage(this.pokemonList.next, () => {
        this.loadPokemonDetails(); // Cargar los detalles actualizados
      });
    }
  }
  
  private getPokemonPage(url: string, callback: () => void): void {
    this.pokeapiService.getPokemonPage(url)
      .subscribe((data: PokemonList) => {
        this.pokemonList = data;
        callback(); // Llamar al callback después de cargar la página
      });
  }

  
  getPokemonId(url: string): string {
    return url.split('/').slice(-2, -1)[0];
  }
  getPokemonIdInt(url: string): number {
    return parseInt(url.split('/').slice(-2, -1)[0]) ;
  }
  
  getPokemonImageUrl(url: string): string {
    // Obtener el ID del Pokémon de la URL
    const pokemonId = url.split('/').slice(-2, -1)[0];
    // Construir la URL de la imagen del Pokémon
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  getPokemonDetailsByUrl(url: string): Observable<PokemonDetails> {
    return this.pokeapiService.getPokemonDetailsByUrl(url);
  }

}
