import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  private apiService = inject( ApiService )

  public ventas: any[] = []

  ngOnInit(): void {
    this.cargarImpuestos()
  }

  cargarImpuestos() {
    this.apiService.peticionGet('api/v1/facturas')
      .subscribe({
        next: (response: any) => {
          console.log({ response })
          this.ventas = response.data
        }
      })
  }
}
