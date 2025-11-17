import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BackendCallsService } from '../services/backend-calls-service';
import { Router } from '@angular/router';
import { CountryInfoModel } from '../models/country-info-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionModel } from '../models/region-model';
import { CountryInfoAdvancedModel } from '../models/country-info-advanced-model';
@Component({
    selector: 'app-countries-info-advanced',
    templateUrl: './countries-info-advanced.component.html',
    styleUrls: ['./countries-info-advanced.component.css'],
    standalone: false
})
export class CountriesInfoAdvancedComponent implements OnInit, AfterViewInit {

  public form = new FormGroup({
    yearFrom: new FormControl<number|null>(null, [Validators.min(1920), Validators.max(2025)]),
    yearTo: new FormControl<number|null>(null, [Validators.min(1920), Validators.max(2025)]),
    region: new FormControl<number|null>(null),
    pagination: new FormControl<number>(10),
    currentPage: new FormControl<number>(1)
  });

  private _countries: CountryInfoAdvancedModel[] = [];
  private _displayedColumns: string[] = ['continentName', 'regionName', 'countryName', 'year', 'population', 'gdp'];
  private _paginations: number[] = [5, 10, 25, 50, 100];
  private _pages: number[] = [1];
  private _regions: RegionModel[] = [];
  clickedRows = new Set<CountryInfoAdvancedModel>();

  constructor(private backendService: BackendCallsService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.backendService.getAllRegions().subscribe({
      next: (regions: RegionModel[]) => {
        this._regions = regions;

        console.info('Fetched regions:', this._regions);
      },
      error: (error) => {
        console.error('Error fetching regions:', error);
      }
    });
  }


  public get countries(): CountryInfoAdvancedModel[] {
    return this._countries;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  public get regions(): RegionModel[] {
    return this._regions;
  }

  public get paginations(): number[] {
    return this._paginations;
  }

  public get pages(): number[] {
    return this._pages;
  }

  public launchCountry(row: CountryInfoModel): void {
    console.log('Launching country:', row);

    this.router.navigate(['/languages', row.countryCode]);
  }

  public applyFilters(): void {
    const yearFrom = this.form.get('yearFrom')?.value;
    const yearTo = this.form.get('yearTo')?.value;
    const region = this.form.get('region')?.value;
    const pagination = this.form.get('pagination')?.value;
    const currentPage = this.form.get('currentPage')?.value;

    console.log('Applying filters - Year From:', yearFrom, 'Year To:', yearTo, 'Region:', region);

    this.backendService.getCountriesInfoAdvanced(yearFrom, yearTo, region, pagination || undefined, currentPage || undefined).subscribe({
      next: ({list: countries, totalPages}: {list: CountryInfoAdvancedModel[], totalPages: number}) => {
        this._countries = countries;

        this._pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        console.info('Fetched filtered countries:', this._countries);
      },
      error: (error) => {
        console.error('Error fetching filtered countries:', error);
      }
    });
  }
}
