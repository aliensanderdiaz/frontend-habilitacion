import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {

  tiposDeImpuesto = [
    'IVA',
    'Impoconsumo',
    'Retefuente',
    'ReteICA',
    'ReteIVA',
  ]

  name = ''
  code = ''
  tarifa = 0
  tipo = ''
  accountSales = ''
  accountShopping = ''
  accountSalesReturn = ''
  accountShoppingReturn = ''

  cuentas: any[] = []
  impuestos: any[] = []

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.cargarCuentas()
    this.cargarImpuestos()
  }

  cargarCuentas() {
    if (this.cuentas.length > 0) {
      return
    }
    let cuentasString = this.storageService.obtener('cuentas')
    if (cuentasString) {
      this.cuentas = JSON.parse( cuentasString )
      return
    }
    this.apiService.peticionGet('api/v1/accounts')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.cuentas = response.data
          this.storageService.guardar('cuentas', JSON.stringify(this.cuentas))
        }
      })
  }

  cargarImpuestos() {
    if (this.impuestos.length > 0) {
      return
    }
    let impuestosString = this.storageService.obtener('impuestos')
    if (impuestosString) {
      this.impuestos = JSON.parse( impuestosString )
      return
    }
    this.apiService.peticionGet('api/v1/impuestos')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.impuestos = response.data
          this.storageService.guardar('impuestos', JSON.stringify(this.impuestos))
        }
      })
  }

  crearImpuesto() {
    const data = {
      name: this.name,
      code: this.code,
      tarifa: this.tarifa,
      tipo: this.tipo,
      accountSales: this.accountSales,
      accountShopping: this.accountShopping,
      accountSalesReturn: this.accountSalesReturn,
      accountShoppingReturn: this.accountShoppingReturn,
    }

    console.log({ data })

    this.apiService.peticionPost('api/v1/impuestos', data)
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.impuestos.unshift( response.data )
        }
      })

  }
}
