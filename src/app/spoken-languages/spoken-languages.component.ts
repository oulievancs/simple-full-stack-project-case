import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CountryModel } from '../models/coutry-model';
import { BackendCallsService } from '../services/backend-calls-service';
import { LanguageModel } from '../models/language-model';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-spoken-languages',
    templateUrl: './spoken-languages.component.html',
    styleUrls: ['./spoken-languages.component.css'],
    standalone: false
})
export class SpokenLanguagesComponent implements OnInit, AfterViewInit {

  private _languages: LanguageModel[] = [];
  private _countryCode: string = '';
  private _displayedColumns: string[] = ['language'];
  clickedRows = new Set<CountryModel>();

  constructor(private backendService: BackendCallsService,
    private activatedRoute: ActivatedRoute
  ) {
    this._countryCode = this.activatedRoute.snapshot.params['countryCode'];
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.backendService.getLanguages(this._countryCode).subscribe({
      next: (languages: LanguageModel[]) => {
        this._languages = languages;

        console.info('Fetched languages:', this._languages);
      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      }
    });
  }


  public get languages(): LanguageModel[] {
    return this._languages;
  }

  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }
}
