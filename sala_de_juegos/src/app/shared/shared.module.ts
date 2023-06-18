import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[NavbarComponent]
})
export class SharedModule { }
