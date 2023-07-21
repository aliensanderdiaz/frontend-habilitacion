import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.css']
})
export class TercerosComponent implements OnInit {
  private apiService = inject( ApiService )
  public terceros: any[] = []
  public cargando = true
  public error = false

  ngOnInit(): void {
    this.cargarTerceros()
  }

  cargarTerceros() {
    this.cargando = true
    this.error = false
    this.terceros = []
    this.apiService.peticionGet('api/v1/usuarios')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.cargando = false
          this.terceros = response.data
        },
        error: (responseError: any) => {
          console.log({ responseError })
          this.error = true
          this.cargando = false
        }
      })
  }
}
