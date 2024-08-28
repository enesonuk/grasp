import { NgModule } from '@angular/core'; 
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [provideHttpClient()],
})
export class AppModule {}
