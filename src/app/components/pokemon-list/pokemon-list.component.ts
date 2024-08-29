import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PokemonService } from '../../services/pokemon.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { PokemonDetail} from '../../models/pokemon.model';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TableModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    TagModule,
    MultiSelectModule
  ],
  providers: [PokemonService, Router],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})

export class PokemonListComponent implements OnInit {
  pokemons: PokemonDetail[] = [];
  allPokemons: PokemonDetail[] = []
  selectedTypes: { label: string, value: string, color: string }[] = [];
  loading: boolean = true;

  pokemonTypes: { label: string, value: string, color: string }[] = [
    { label: 'Fire', value: 'fire', color: '#FF8A80' },
    { label: 'Water', value: 'water', color: '#81D4FA' },
    { label: 'Grass', value: 'grass', color: '#A5D6A7' },
    { label: 'Electric', value: 'electric', color: '#FFF176' },
    { label: 'Psychic', value: 'psychic', color: '#CE93D8' },
    { label: 'Ice', value: 'ice', color: '#80DEEA' },
    { label: 'Dragon', value: 'dragon', color: '#FFCC80' },
    { label: 'Dark', value: 'dark', color: '#B0BEC5' },
    { label: 'Fairy', value: 'fairy', color: '#F48FB1' },
    { label: 'Normal', value: 'normal', color: '#E0E0E0' },
    { label: 'Flying', value: 'flying', color: '#B39DDB' },
    { label: 'Bug', value: 'bug', color: '#C5E1A5' },
    { label: 'Poison', value: 'poison', color: '#BA68C8' },
    { label: 'Ground', value: 'ground', color: '#D7CCC8' },
    { label: 'Fighting', value: 'fighting', color: '#FFAB91' },
    { label: 'Ghost', value: 'ghost', color: '#B39DDB' },
    { label: 'Rock', value: 'rock', color: '#D5CBB2' },
    { label: 'Steel', value: 'steel', color: '#B0BEC5' },
  ];
  

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        this.allPokemons = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
        this.loading = false;
      }
    });
  }

  filterPokemonsByType(selectedTypes: { label: string, value: string, color: string }[]) {
    if (selectedTypes.length === 0) {
      this.pokemons = [...this.allPokemons];
    } else {
      const selectedTypeValues = selectedTypes.map(type => type.value);
    
      this.pokemons = this.allPokemons.filter(pokemon =>
        pokemon.types.some(typeObj => selectedTypeValues.includes(typeObj.type.name))
      );
    }
  }

  getTypeColor(type: string): string {
    return this.pokemonTypes.find(pokemonType => pokemonType.value === type)?.color || '#000000';
  } 

  onPageChange() {
    this.loadPokemons();
  }

  viewDetails(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}
