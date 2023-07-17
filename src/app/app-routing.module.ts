import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { CuentasContablesComponent } from './pages/cuentas-contables/cuentas-contables.component';
import { CrearCuentaContableComponent } from './pages/cuentas-contables/crear-cuenta-contable/crear-cuenta-contable.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cuentas-contables', component: CuentasContablesComponent },
  { path: 'cuentas-contables/crear', component: CrearCuentaContableComponent },
  { path: 'impuestos', component: ImpuestosComponent },
  { path: '**', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
