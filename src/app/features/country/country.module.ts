import { NgModule } from '@angular/core';
import { CountryComponent } from './country.component';
import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryService } from './country.service';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    CountryComponent,
    CountryListComponent
  ],
  imports: [
    CountryRoutingModule,
    SharedModule
  ],
  providers: [
    CountryService
  ],
  bootstrap: [ CountryComponent ]
})
export class CountryModule { }
