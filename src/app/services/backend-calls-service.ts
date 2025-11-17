import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CountryModel } from "../models/coutry-model";
import { LanguageModel } from "../models/language-model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CountryInfoModel } from "../models/country-info-model";
import { HttpErrorResponse } from "@angular/common/module.d-CnjH8Dlt";
import { RegionModel } from "../models/region-model";
import { CountryInfoAdvancedModel } from "../models/country-info-advanced-model";

@Injectable({
    providedIn: 'root'
})
export class BackendCallsService {

    private apiUrl = 'http://localhost:8080/';
    private token: string;

    constructor(private httpClient: HttpClient) {
        this.token = localStorage.getItem('authToken') || '';

        if (!this.token) {
            this.authenticate();
            return;
        }

        this.httpClient.get(`${this.apiUrl}countries`, {
            headers: this.getHeaders()
        }).subscribe({
            next: (response: any) => {
                console.log('Authenticated request successful', response);
            }, error: (error: HttpErrorResponse) => {
                this.authenticate();
                console.error('Authenticated request failed', error);
            }
        });
    }

    private getHeaders() {
        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    private authenticate(): void {
        this.httpClient.post<{ access_token: string }>(`${this.apiUrl}api/auth/login`, {
            username: 'root',
            password: 'root'
        }).subscribe({
            next: (response: { access_token: string }) => {
                this.token = response.access_token;
                localStorage.setItem('authToken', this.token);
            }
        });
    }

    public getCountries(orderBy?: string): Observable<CountryModel[]> {
        return this.httpClient.get<{countries: CountryModel[]}>(`${this.apiUrl}countries?orderBy=${orderBy || 'name'}`, {
            headers: this.getHeaders()
        }).pipe(map((response: { countries: CountryModel[] }) => response.countries || []));
    }

    public getLanguages(countryCode: string): Observable<LanguageModel[]> {
        return this.httpClient.get<{languages: LanguageModel[]}>(`${this.apiUrl}languages/${countryCode}`, {
            headers: this.getHeaders()
        }).pipe(map((response: { languages: LanguageModel[] }) => response.languages || []));
    }

    public getCountriesInfo(orderBy?: string): Observable<CountryInfoModel[]> {
        return this.httpClient.get<{countries: CountryInfoModel[]}>(`${this.apiUrl}countryInfo?orderBy=${orderBy || 'countryCode'}`, {
            headers: this.getHeaders()
        }).pipe(map((response: { countries: CountryInfoModel[] }) => response.countries || []));
    }

    public getAllRegions(): Observable<RegionModel[]> {
        return this.httpClient.get<{regions: RegionModel[]}>(`${this.apiUrl}regions`, {
            headers: this.getHeaders()
        }).pipe(map((response: { regions: RegionModel[] }) => response.regions || []));
    }

    public getCountriesInfoAdvanced(yearFrom?: number | null, yearTo?: number | null, region?: number | null,
        pagination?: number, currentPage?: number): Observable<{list: CountryInfoAdvancedModel[], totalPages: number}> {
        let url = `${this.apiUrl}countryInfoAdvanced?`;

        if (yearFrom !== null && yearFrom !== undefined) {
            url += `yearFrom=${yearFrom}&`;
        }
        if (yearTo !== null && yearTo !== undefined) {
            url += `yearTo=${yearTo}&`;
        }
        if (region !== null && region !== undefined) {
            url += `region=${region}&`;
        }
        if (pagination !== null && pagination !== undefined) {
            url += `size=${pagination}&`;
        }
        if (currentPage !== null && currentPage !== undefined) {
            url += `page=${currentPage}&`;
        }

        return this.httpClient.get<{countries: CountryInfoAdvancedModel[], totalPages: number}>(url, {
            headers: this.getHeaders()
        }).pipe(map((response: { countries: CountryInfoAdvancedModel[], totalPages: number }) =>
            ({ list: response.countries || [], totalPages: response.totalPages || 1 })));
    }
}
