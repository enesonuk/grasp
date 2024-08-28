import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetail } from '../../models/pokemon.model';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { CommonModule, Location} from '@angular/common';
import { Button } from 'primeng/button';


@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [PanelModule, ProgressSpinnerModule, TableModule, CommonModule, Button],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonDetail = {} as PokemonDetail;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching Pokémon details:', error);
          this.loading = false;
        },
      });
    }
  }

  getPokemonTypes(pokemon: PokemonDetail): string {
    return pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(', ');
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.pokemon = {} as PokemonDetail;
  }
}
