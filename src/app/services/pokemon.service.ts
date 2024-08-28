import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PokemonDetail } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonDetail[]> {
    return this.http.get<{ results: { url: string }[] }>(`${this.apiUrl}?limit=151`).pipe(
      switchMap((response): Observable<PokemonDetail[]> => {
        const requests = response.results.map(pokemon => this.http.get<PokemonDetail>(pokemon.url));
        return forkJoin(requests);
      }),
      catchError(error => {
        console.error('Error fetching Pokémon list', error);
        return of([]);
      })
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/${name}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon details', error);
        return of({} as PokemonDetail); 
      })
    );
  }
}
