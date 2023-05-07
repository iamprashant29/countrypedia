import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CountryService} from '../country.service';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['country-list.component.scss']
})
export class CountryListComponent implements OnInit, AfterViewInit {
  countriesList: any[] = [];
  // @ts-ignore
  searchForm: FormGroup;

  constructor(public countryService: CountryService) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getCountriesList();
  }

  ngAfterViewInit() {
    /*this.searchForm.get('searchTerm')?.valueChanges.subscribe({
      next: (data) => {
        console.log(data)
      }
    });*/
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (searchTerm === '') {
          return this.countryService.getCountries();
        } else {
          return this.countryService.searchCountriesByName(searchTerm);
        }
      }))
      .subscribe({
        next: (data) => {
          // @ts-ignore
          this.countriesList = data.sort((a, b) => {
            if (a.name.common < b.name.common)
              return -1;
            if (a.name.common > b.name.common)
              return 1;
            return 0;
          });
        },
        error: () => {
          this.countriesList = []
        }
    })
  }

  initializeForm() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    });
  }

  getCountriesList() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        // @ts-ignore
        this.countriesList = data.sort((a, b) => {
          if (a.name.common < b.name.common)
            return -1;
          if (a.name.common > b.name.common)
            return 1;
          return 0;
        });
      }
    });
  }
}
