import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { PokemonDetailComponent } from './app/components/pokemon-detail/pokemon-detail.component';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    provideRouter([
      { path: '', component: AppComponent },
      { path: 'pokemon/:name', component: PokemonDetailComponent },
    ]),
  ],
}).catch((err) => console.error(err));

 
  
