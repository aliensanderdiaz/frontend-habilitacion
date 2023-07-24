import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent {
  public impuestoIncluido = true
  public descuentoEnPorcentaje = true

  public impuestos = []
  public retenciones = []

  public lineaTemp = {
    plu: undefined,
    producto: undefined,
    cantidad: 1,
    precio: undefined,
    descuento1: 0,
    descuento2: 0,
    impuesto: undefined,
    retencion: undefined
  }
}
