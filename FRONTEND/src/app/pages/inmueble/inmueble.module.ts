import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleRoutingModule } from './inmueble-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InmuebleRoutingModule,

    StoreModule.forFeature('inmueble', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class InmuebleModule { }
