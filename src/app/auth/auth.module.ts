import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class AuthModule { }
