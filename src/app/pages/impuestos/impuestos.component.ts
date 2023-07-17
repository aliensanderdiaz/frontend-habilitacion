import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.cargarCuentas()
    this.cargarImpuestos()
  }

  cargarCuentas() {
    this.apiService.peticionGet('api/v1/accounts')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.cuentas = response.data
        }
      })
  }

  cargarImpuestos() {
    this.apiService.peticionGet('api/v1/impuestos')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.impuestos = response.data
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
