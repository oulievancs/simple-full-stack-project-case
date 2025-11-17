import { NgModule } from '@angular/core';
import { BrowserModule as NgBrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SelectCountryComponent } from './select-country/select-country.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpokenLanguagesComponent } from './spoken-languages/spoken-languages.component';
import { CountriesInfoComponent } from './countries-info/countries-info.component';
import { CountriesInfoAdvancedComponent } from './countries-info-advanced/countries-info-advanced.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectCountryComponent,
    SpokenLanguagesComponent,
    CountriesInfoComponent,
    CountriesInfoAdvancedComponent
  ],
  imports: [
    NgBrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
