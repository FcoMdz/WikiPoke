import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/wiki/card/card.component';
import { DetailsComponent } from './components/wiki/details/details.component';
import { HomeComponent } from './components/wiki/home/home.component';
import { CommonModule } from '@angular/common';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CardComponent,
    DetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [PokeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
