import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryComponent } from './select-country/select-country.component';
import { SpokenLanguagesComponent } from './spoken-languages/spoken-languages.component';
import { CountriesInfoComponent } from './countries-info/countries-info.component';
import { CountriesInfoAdvancedComponent } from './countries-info-advanced/countries-info-advanced.component';


export const routes: Routes = [
  { path: "", component: SelectCountryComponent },
  { path: "languages/:countryCode", component: SpokenLanguagesComponent },
  { path: "countries-info", component: CountriesInfoComponent },
  { path: "countries-info-advanced", component: CountriesInfoAdvancedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
