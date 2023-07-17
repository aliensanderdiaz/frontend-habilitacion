import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cuentas-contables',
  templateUrl: './cuentas-contables.component.html',
  styleUrls: ['./cuentas-contables.component.css']
})
export class CuentasContablesComponent implements OnInit {

  cuentasContables: any[] = []
  nombreCuentaPrincipal = ''
  codigoCuentaPrincipal = ''
  cuentaSeleccionada?: any

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarCuentasContables()
  }

  cargarCuentasContables() {
    this.apiService.peticionGet('api/v1/accounts/crear-arbol-de-cuentas')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.cuentasContables = response.data
          this.cuentaSeleccionada = this.cuentasContables[0]
        },
        error: (responseError) => {
          console.log({ responseError })
        }
      })
  }

  crearCuentaPrincipal() {
    this.nombreCuentaPrincipal = this.nombreCuentaPrincipal.trim()
    this.codigoCuentaPrincipal = this.codigoCuentaPrincipal.trim()
    if (!this.nombreCuentaPrincipal || !this.codigoCuentaPrincipal) {
      return
    }
    const data = {
      name: this.nombreCuentaPrincipal,
      code: this.codigoCuentaPrincipal,
      parent: this.cuentaSeleccionada._id
    }

    console.log({ data })
    this.apiService.peticionPost('api/v1/accounts', data)
    .subscribe({
      next: (response: any) => {
        console.log({ response })
        if (this.cuentaSeleccionada.children) {
          this.cuentaSeleccionada.children.push( response.data )
        } else {
          this.cuentaSeleccionada.children = [ response.data ]
        }
      },
      error: (responseError) => {
        console.log({ responseError })
      }
    })
  }


  elegirParent(categoria: any) {
    this.cuentaSeleccionada = categoria
  }


}
