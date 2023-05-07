import {Injectable} from '@angular/core';
import {BaseService} from '../../../base.service';
import {ApiConstants} from '../../constants/api-constants';
import {Observable} from 'rxjs';

@Injectable()
export class CountryService extends BaseService {
  constructor() {
    super();
  }

  getCountries(): Observable<any> {
    const url = ApiConstants.constants.getCountries;
    return this.httpClient?.get<any>(url);
  }

  searchCountriesByName(searchTerm: string): Observable<any> {
    const url = `${ApiConstants.constants.searchByCountryName}/${searchTerm}`;
    return this.httpClient?.get<any>(url);
  }
}
