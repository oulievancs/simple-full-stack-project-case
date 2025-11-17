import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CountryModel } from '../models/coutry-model';
import { BackendCallsService } from '../services/backend-calls-service';
import { Router } from '@angular/router';
import { CountryInfoModel } from '../models/country-info-model';
@Component({
    selector: 'app-countries-info',
    templateUrl: './countries-info.component.html',
    styleUrls: ['./countries-info.component.css'],
    standalone: false
})
export class CountriesInfoComponent implements OnInit, AfterViewInit {

  private _countries: CountryInfoModel[] = [];
  private _displayedColumns: string[] = ['name', 'year', 'countryCode', 'population', 'gdp'];
  clickedRows = new Set<CountryInfoModel>();

  constructor(private backendService: BackendCallsService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.backendService.getCountriesInfo().subscribe({
      next: (countries: CountryInfoModel[]) => {
        this._countries = countries;

        console.info('Fetched countries:', this._countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }


  public get countries(): CountryInfoModel[] {
    return this._countries;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  public launchCountry(row: CountryInfoModel): void {
    console.log('Launching country:', row);

    this.router.navigate(['/languages', row.countryCode]);
  }
}
