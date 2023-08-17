import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-formas-de-pago',
  templateUrl: './formas-de-pago.component.html',
  styleUrls: ['./formas-de-pago.component.css']
})
export class FormasDePagoComponent implements OnInit {

  private apiService = inject(ApiService)
  private storageService = inject(StorageService)
  public cargando = true;
  public error = false;
  public formasDePago: any[] = []

  ngOnInit(): void {
    this.cargarFormasDePago()
  }

  cargarFormasDePago() {
    this.cargando = true
    this.error = false

    this.apiService.peticionGet('api/v1/formas-de-pago')
      .subscribe({
        next: (response: any) => {
          this.error = false
          this.cargando = false
          console.log({ response })
          this.formasDePago = response.data

          this.storageService.guardar('formasDePago', JSON.stringify(this.formasDePago))
        },
        error: (responseError: any) => {
          this.error = true
          this.cargando = false
          console.log({ responseError })
        },
        complete: () => {
          console.log({ mensaje: 'Función cargarFormasDePago terminó satisfactoriamente' })
        },
      })
  }
}
