import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentasContablesComponent } from './pages/cuentas-contables/cuentas-contables.component';
import { CrearCuentaContableComponent } from './pages/cuentas-contables/crear-cuenta-contable/crear-cuenta-contable.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentasContablesComponent,
    CrearCuentaContableComponent,
    MenuComponent,
    ImpuestosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
