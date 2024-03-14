import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleListRoutingModule } from './inmueble-list-routing.module';
import { InmuebleListComponent } from './inmueble-list.component';
import { SpinnerModule } from '@app/shared/indicators';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    InmuebleListComponent
  ],
  imports: [
    CommonModule,
    InmuebleListRoutingModule,
    SpinnerModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class InmuebleListModule { }
