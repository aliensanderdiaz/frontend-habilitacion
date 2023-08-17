import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crear-formar-de-pago',
  templateUrl: './crear-formar-de-pago.component.html',
  styleUrls: ['./crear-formar-de-pago.component.css']
})
export class CrearFormarDePagoComponent implements OnInit {
  private storageService = inject(StorageService)
  private apiService = inject(ApiService)
  public cuentasContables: any[] = []

  public cuentaContableElegida!: string
  public code: string = ''
  public name: string = ''

  ngOnInit(): void {
    this.cargarCuentas()
  }

  cargarCuentas() {
    if (this.cuentasContables.length > 0) {
      return
    }
    let cuentasString = this.storageService.obtener('cuentas')
    if (cuentasString) {
      this.cuentasContables = JSON.parse( cuentasString )
      return
    }
    this.apiService.peticionGet('api/v1/accounts')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.cuentasContables = response.data
          this.storageService.guardar('cuentas', JSON.stringify(this.cuentasContables))
        }
      })
  }

  crearFormaDePago() {
    const formaDePago = {
      code: this.code,
      name: this.name,
      account: this.cuentaContableElegida,
    }
    console.log({ formaDePago })
    this.apiService.peticionPost('api/v1/formas-de-pago', formaDePago)
      .subscribe({
        next: (response: any) => {
          console.log({ response})
        },
        error: (responseError: any) => {
          console.log({ responseError })
        }
      })
  }
}
