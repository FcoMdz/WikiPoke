import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokeapiService  {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<PokemonList> {
    const url = `${this.apiUrl}/pokemon/?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonList>(url);
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    const url = `${this.apiUrl}/pokemon/${id}/`;
    return this.http.get<PokemonDetails>(url);
  }
  getPokemonPage(url: string): Observable<PokemonList> {
    return this.http.get<PokemonList>(url);
  }
}
export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
  lastUpdated: Date; // Agrega el atributo lastUpdated para la fecha de la última actualización
}

export interface PokemonSprites {
  front_default: string;
  // Aquí puedes agregar otras imágenes si es necesario
}

