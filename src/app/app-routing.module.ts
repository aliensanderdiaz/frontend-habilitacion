import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { CuentasContablesComponent } from './pages/cuentas-contables/cuentas-contables.component';
import { CrearCuentaContableComponent } from './pages/cuentas-contables/crear-cuenta-contable/crear-cuenta-contable.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { VentaComponent } from './pages/ventas/venta/venta.component';
import { TercerosComponent } from './pages/terceros/terceros.component';
import { TerceroComponent } from './pages/terceros/tercero/tercero.component';
import { CrearVentaComponent } from './pages/ventas/crear-venta/crear-venta.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cuentas-contables', component: CuentasContablesComponent },
  { path: 'cuentas-contables/crear', component: CrearCuentaContableComponent },
  { path: 'impuestos', component: ImpuestosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'ventas/crear-venta', component: CrearVentaComponent },
  { path: 'ventas/:id', component: VentaComponent },
  { path: 'terceros', component: TercerosComponent },
  { path: 'terceros/:id', component: TerceroComponent },
  { path: '**', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
