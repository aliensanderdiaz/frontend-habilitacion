import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  private apiService = inject( ApiService )
  private activatedRoute = inject( ActivatedRoute )

  public cargando = true
  public venta: any

  ngOnInit(): void {
    this.cargarFactura()
  }

  cargarFactura() {
    const facturaId = this.activatedRoute.snapshot.params['id']
    console.log({ facturaId })
    this.apiService.peticionGet('api/v1/facturas/' + facturaId)
    .subscribe({
      next: (response: any) => {
        console.log({ response })
        this.cargando = false
        this.venta = response.data
      }
    })
  }
}
