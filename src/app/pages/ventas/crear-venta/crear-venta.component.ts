import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {
  private storageService = inject(StorageService)
  private apiService = inject(ApiService)
  public impuestoIncluido = true
  public descuentoEnPorcentaje = true

  public impuestos: any[] = []
  public retenciones: any[] = []

  public lineaTemp = {
    plu: undefined,
    nombre: undefined,
    cantidad: 1,
    valor: undefined,
    descuento1: 0,
    descuento2: 0,
    impuesto: undefined,
    retencion: undefined
  }

  public lineas: any[] = []

  ngOnInit(): void {
    const impuestosString = this.storageService.obtener('impuestos')
    if (impuestosString) {
      this.impuestos = JSON.parse(impuestosString)
    }
  }

  agregarItem() {

    const {
      plu,
      nombre,
      cantidad,
      valor,
      descuento1,
      descuento2,
      impuesto,
      retencion,
    } = this.lineaTemp

    if (!plu || !nombre || !impuesto) {
      alert('Error con el plu, nombre o impuesto')
      return
    }

    if (cantidad < 1) {
      alert('Error en cantidad')
      return
    }

    if (!valor || valor <= 0) {
      alert('Error en valor')
      return
    }

    if (this.descuentoEnPorcentaje) {
      if (descuento1 < 0 || descuento1 > 100 || descuento2 < 0 || descuento2 > 100) {
        alert('Error en los descuentos Porcentajes equivocados')
        return
      }
    } else {
      if (descuento1 < 0  || descuento2 < 0 || descuento1 + descuento2 > valor) {
        alert('Error en los descuentos, mayor que el precio')
        return
      }
    }

    console.log({
      lineaTemp: this.lineaTemp
    })

    // INICIO CALCULAR VALOR UNITARIO SIN IMPUESTO

    const impuestoObjeto = this.impuestos.find(item => item._id === impuesto)
    const impuestoTarifa = impuestoObjeto.tarifa

    let valorUnitarioSinImpuesto = undefined

    if (this.impuestoIncluido) {
      let valorImpuestoTemporalUnitario = Math.floor( (valor * impuestoTarifa / (100 + impuestoTarifa)) * 100 ) / 100
      console.log({ valorImpuestoTemporalUnitario })
      valorUnitarioSinImpuesto = Math.floor( ( valor - valorImpuestoTemporalUnitario ) * 100 ) / 100
    } else {
      valorUnitarioSinImpuesto = valor
    }

    console.log({ valorUnitarioSinImpuesto })

    // FIN CALCULAR VALOR UNITARIO SIN IMPUESTO

    const lineaTemp = {...this.lineaTemp}

    this.lineas.push(lineaTemp)

    this.resetLineaTemp()


  }

  resetLineaTemp() {
    this.lineaTemp = {
      plu: undefined,
      nombre: undefined,
      cantidad: 1,
      valor: undefined,
      descuento1: 0,
      descuento2: 0,
      impuesto: undefined,
      retencion: undefined
    }
  }

  crearFactura() {

    let factura = {
      impuestoIncluido: this.impuestoIncluido,
      descuentoEnPorcentaje: this.descuentoEnPorcentaje,
      "date": "2023-06-21",
      "time": "08:00:00",
      "clienteId": "64b7f5bd793db02a023c8504",
      "clienteSnapshot": {
        "direccion": "Neiva",
        "dv": 1,
        "email": "alexanderdiaz1989@gmail.com",
        "nombre": "JOHN ALEXANDER DIAZ ASTUDILLO",
        "numeroId": "1075235031",
        "regimenCode": "49",
        "regimenName": "No Responsable de IVA",
        "responsabilidadCode": "R-99-PN",
        "responsabilidadName": "No responsable",
        "telefono": "3138984679",
        "tipoDocumentoCode": "13",
        "tipoDocumentoName": "Cédula de ciudadanía",
        "tipoId": "cc",
        "tipoPersonaCode": "2",
        "tipoPersonaName": "Persona Natural"
      },
      "mediosDePago": [
        {
          "code": "10",
          "name": "Efectivo",
          "repeat": false,
          "comprobanteRequerido": false,
          "numeroDeVoucher": "",
          "total": 11900
        }
      ],
      "lineas": this.lineas,
      // "lineas": [
      //   {
      //     "impuestoIncluido": true,
      //     "descuento1": 19,
      //     "descuento2": 0,
      //     "descuentoEnPorcentaje": true,
      //     "cantidad": 3,
      //     "nombre": "Helice",
      //     "plu": "54538",
      //     "valor": 123456.79,
      //     "impuesto": "64beda4135aea612779ae70d"
      //   },
      //   {
      //     "impuestoIncluido": true,
      //     "descuento1": 10,
      //     "descuento2": 10,
      //     "descuentoEnPorcentaje": true,
      //     "cantidad": 3,
      //     "nombre": "Helice Metalicas",
      //     "plu": "54538",
      //     "valor": 10000,
      //     "impuesto": "64ac8648755942cbfc5087b0"
      //   }
      // ],
      "resolucion": {
        "numeroDeAutorizacion": "1059898646131",
        "fechaDeInicio": "2023-06-01",
        "fechaDeVencimiento": "2024-06-01",
        "prefijo": "HABI",
        "numeracionDesde": 1,
        "numeracionHasta": 10000
      }
    }

    this.apiService.peticionPost('api/v1/facturas', factura)
      .subscribe({
        next: (response: any) => {
          this.lineas = []
          this.resetLineaTemp()
          console.log({ response })
        },
        error: (responseError: any) => {
          console.log({ responseError })
          alert('Error')
        }
      })
  }
}
