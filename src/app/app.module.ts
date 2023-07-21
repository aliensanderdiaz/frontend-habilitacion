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
import { VentasComponent } from './pages/ventas/ventas.component';
import { VentaComponent } from './pages/ventas/venta/venta.component';
import { TercerosComponent } from './pages/terceros/terceros.component';
import { TerceroComponent } from './pages/terceros/tercero/tercero.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentasContablesComponent,
    CrearCuentaContableComponent,
    MenuComponent,
    ImpuestosComponent,
    VentasComponent,
    VentaComponent,
    TercerosComponent,
    TerceroComponent
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
