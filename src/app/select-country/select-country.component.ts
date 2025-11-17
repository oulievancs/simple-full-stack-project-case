import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CountryModel } from '../models/coutry-model';
import { BackendCallsService } from '../services/backend-calls-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-select-country',
    templateUrl: './select-country.component.html',
    styleUrls: ['./select-country.component.css'],
    standalone: false
})
export class SelectCountryComponent implements OnInit, AfterViewInit {

  private _countries: CountryModel[] = [];
  private _displayedColumns: string[] = ['name', 'area', 'countryCode', 'actions'];
  clickedRows = new Set<CountryModel>();

  constructor(private backendService: BackendCallsService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.backendService.getCountries().subscribe({
      next: (countries: CountryModel[]) => {
        this._countries = countries;

        console.info('Fetched countries:', this._countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }


  public get countries(): CountryModel[] {
    return this._countries;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  public launchCountry(row: CountryModel): void {
    console.log('Launching country:', row);

    this.router.navigate(['/languages', row.countryCode]);
  }
}
