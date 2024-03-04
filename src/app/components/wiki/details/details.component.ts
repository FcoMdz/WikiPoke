import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService, PokemonDetails, PokemonStat } from 'src/app/services/pokeapi.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pokemonId: number | undefined;
  pokemonDetails: PokemonDetails | undefined;
  previousOffset: number;
  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService,
    private location: Location
  ) {
    this.previousOffset = window.pageYOffset;
   }

  ngOnInit(): void {
    // Obtener el ID del Pokémon de la URL
    this.route.paramMap.subscribe(params => {
      this.pokemonId = Number(params.get('id'));
      // Obtener los detalles del Pokémon usando el ID
      if(this.pokemonId !== 0)
      this.getPokemonDetails(this.pokemonId);
    });
  }

  getPokemonDetails(id: number): void {
    this.pokeapiService.getPokemonDetails(id)
      .subscribe((data: PokemonDetails) => {
        this.pokemonDetails = data;
      });
  }
  getTypes(): string {
    if (!this.pokemonDetails || !this.pokemonDetails.types) {
      return '';
    }
    return this.pokemonDetails.types.map(type => type.type.name).join(', ');
  }
  getLastUpdated(): string {
    if (!this.pokemonDetails || !this.pokemonDetails.stats) {
      return '';
    }
  
    const lastUpdated = this.pokemonDetails.stats.reduce((latest: Date, stat: PokemonStat) => {
      return stat.lastUpdated > latest ? stat.lastUpdated : latest;
    }, new Date(0));
  
    // Verifica si la última actualización es la fecha mínima (0), lo que indica que no hay datos disponibles
    if (lastUpdated.getTime() === new Date(0).getTime()) {
      return '';
    }
  
    return lastUpdated.toLocaleString();
  }
  goBack(): void {
    window.scrollTo(0, this.previousOffset);
    this.location.back();
  }
}
