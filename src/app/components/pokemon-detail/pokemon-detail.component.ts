import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetail } from '../../models/pokemon.model';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [PanelModule, ProgressSpinnerModule, TableModule, CommonModule],
  providers: [PokemonService, Router],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonDetail = {} as PokemonDetail;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
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

  getPokemonAbilities(pokemon: PokemonDetail): string {
    return pokemon.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(', ');
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.pokemon = {} as PokemonDetail;
  }
}
