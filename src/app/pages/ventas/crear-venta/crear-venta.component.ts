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
  public impuestoIncluido = false
  public descuentoEnPorcentaje = true

  public impuestos: any[] = []
  public retenciones: any[] = []
  public formasDePago: any[] = []

  public formaDePagoElegida!: string
  public totalFormaDePagoTemp = 0

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

  public totalBruto = 0
  public descuentos = 0
  public subtotal = 0
  public impuestosFactura: any[] = []
  public totalImpuestos = 0
  public totalNeto = 0
  public retencionesFactura: any[] = []
  public totalRetenciones = 0
  public totalPagar = 0

  ngOnInit(): void {
    const impuestosString = this.storageService.obtener('impuestos')
    if (impuestosString) {
      const impuestos = JSON.parse(impuestosString)
      this.impuestos = impuestos.filter((item: any) => item.tipo === 'IVA' || item.tipo === 'Impoconsumo')
      this.retenciones = impuestos.filter((item: any) => item.tipo === 'Retefuente')
    }
    const formasDePagoString = this.storageService.obtener('formasDePago')
    if (formasDePagoString) {
      this.formasDePago = JSON.parse(formasDePagoString)
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
      if (descuento1 < 0 || descuento2 < 0 || descuento1 + descuento2 > valor) {
        alert('Error en los descuentos, mayor que el precio')
        return
      }
    }

    // INICIO CALCULAR VALOR UNITARIO SIN IMPUESTO

    const impuestoObjeto = this.impuestos.find(item => item._id === impuesto)
    const impuestoTarifa = impuestoObjeto?.tarifa || 0

    let valorUnitarioBruto = undefined

    if (this.impuestoIncluido) {
      let valorImpuestoTemporalUnitario = Number((valor * impuestoTarifa / (100 + impuestoTarifa) ).toFixed(2))
      valorUnitarioBruto = Math.floor((valor - valorImpuestoTemporalUnitario) * 100) / 100
    } else {
      valorUnitarioBruto = valor
    }

    // FIN CALCULAR VALOR UNITARIO SIN IMPUESTO

    // INICIO Descuentos

    let valorDescuento1 = 0
    let valorDescuento2 = 0

    if (this.descuentoEnPorcentaje) {
      valorDescuento1 = Number(((valorUnitarioBruto * descuento1 / 100)).toFixed(2))
      let valorUnitarioConDescuento1 = Number((valorUnitarioBruto - valorDescuento1).toFixed(2))
      valorDescuento2 = Number(((valorUnitarioConDescuento1 * descuento2 / 100)).toFixed(2))
    } else {
      valorDescuento1 = descuento1
      valorDescuento2 = descuento2
    }

    const valorUnitarioDescuentos = Number((valorDescuento1 + valorDescuento2).toFixed(2))

    // FIN Descuentos

    const valorUnitarioBase = Number((valorUnitarioBruto - valorUnitarioDescuentos).toFixed(2))

    const valorUnitarioImpuesto = Number((valorUnitarioBase * impuestoTarifa / 100).toFixed(2))
    const valorUnitarioTotal = Number((valorUnitarioBase + valorUnitarioImpuesto).toFixed(2))

    const retencionObjeto = this.retenciones.find(item => item._id === retencion)
    const retencionTarifa = retencionObjeto?.tarifa || 0

    const valorUnitarioRetencion = Number((valorUnitarioBase * retencionTarifa / 100).toFixed(2))
    const valorUnitarioTotalAPagar = Number((valorUnitarioTotal - valorUnitarioRetencion).toFixed(2))

    const valorBruto = Number((valorUnitarioBruto * cantidad).toFixed(2))
    const valorDescuentos = Number((valorUnitarioDescuentos * cantidad).toFixed(2))
    const valorBase = Number((valorUnitarioBase * cantidad).toFixed(2))
    const valorImpuesto = Number((valorUnitarioImpuesto * cantidad).toFixed(2))
    const valorTotal = Number((valorUnitarioTotal * cantidad).toFixed(2))

    const valorRetencion = Number((valorUnitarioRetencion * cantidad).toFixed(2))
    const valorTotalAPagar = Number((valorUnitarioTotalAPagar * cantidad).toFixed(2))

    let lineaConTodosLosValores = {

      plu,
      nombre,

      impuesto,
      impuestoTarifa,

      retencion,
      retencionTarifa,

      cantidad,
      valorIngresado: valor,
      descuentoIngresado1: descuento1,
      descuentoIngresado2: descuento2,

      valorUnitarioBruto,
      valorUnitarioDescuentos,
      valorUnitarioBase,
      valorUnitarioImpuesto,
      valorUnitarioTotal,

      valorUnitarioRetencion,
      valorUnitarioTotalAPagar,

      valorBruto,
      valorDescuentos,
      valorBase,
      valorImpuesto,
      valorTotal,

      valorRetencion,
      valorTotalAPagar,
    }

    this.lineas.push(lineaConTodosLosValores)

    this.resetLineaTemp()

    this.calcularTotales()

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

  calcularTotales() {
    this.totalBruto = this.lineas
                        .map(linea => linea.valorBruto)
                        .reduce((a, b) => a + b, 0)

    this.totalBruto = Number(this.totalBruto.toFixed(2))

    this.calcularDescuentos()

    this.subtotal = Number(( this.totalBruto - this.descuentos ).toFixed(2))
    this.calcularImpuestos()
    this.totalNeto = Number(( this.subtotal + this.totalImpuestos ).toFixed(2))

    this.calcularRetenciones()
    this.totalPagar = Number(( this.totalNeto - this.totalRetenciones ).toFixed(2))

    console.log({
      'this.totalBruto': this.totalBruto,
      'this.descuentos': this.descuentos,
      'this.subtotal': this.subtotal,
      'this.totalImpuestos': this.totalImpuestos,
      'this.totalNeto': this.totalNeto,
      'this.totalRetenciones': this.totalRetenciones,
      'this.totalPagar': this.totalPagar,
    })
  }

  calcularDescuentos() {
    if (this.lineas.length === 0) {
      this.descuentos = 0
      return
    }
    this.descuentos = this.lineas
                        .map(linea => linea.valorDescuentos)
                        .reduce((a, b) => a + b, 0)

    this.descuentos = Number(this.descuentos.toFixed(2))
  }

  calcularImpuestos() {
    this.impuestosFactura = []
    if (this.lineas.length === 0) {
      this.impuestosFactura = []
      return
    }
    const impuestosEnLineas = this.lineas.map(linea => linea.impuesto)
    const impuestosNoRepeat: any[] = [...new Set(impuestosEnLineas)]

    for (const impuesto of impuestosNoRepeat) {
      const impuestosFilter = this.lineas.filter(item => item.impuesto === impuesto)
      let impuestosTotal = impuestosFilter.map(linea => linea.valorImpuesto).reduce((a, b) => a + b, 0)
      impuestosTotal = Number(impuestosTotal.toFixed(2))

      let impuestoObject = {
        impuesto: impuesto,
        impuestoName: this.impuestos.find(item => item._id === impuesto)['name'],
        valor: impuestosTotal
      }

      this.impuestosFactura.push( impuestoObject )
    }

    this.totalImpuestos =  this.impuestosFactura.map(item => item.valor).reduce((a, b) => a + b, 0)
    this.totalImpuestos = Number(this.totalImpuestos.toFixed(2))
  }

  calcularRetenciones() {
    this.retencionesFactura = []
    if (this.lineas.length === 0) {
      this.retencionesFactura = []
      return
    }

    const retencionesEnLineas = this.lineas.map(linea => linea.retencion).filter(retencion => retencion)
    const retencionesNoRepeat: any[] = [...new Set(retencionesEnLineas)]

    console.log({ retencionesEnLineas, retencionesNoRepeat })

    for (const retencion of retencionesNoRepeat) {
      const retencionesFilter = this.lineas.filter(item => item.retencion === retencion)
      let retencionesTotal = retencionesFilter.map(linea => linea.valorRetencion).reduce((a, b) => a + b, 0)
      retencionesTotal = Number(retencionesTotal.toFixed(2))

      let retencionObject = {
        retencion: retencion,
        retencionName: this.retenciones.find(item => item._id === retencion)['name'],
        valor: retencionesTotal
      }

      this.retencionesFactura.push( retencionObject )
    }

    this.totalRetenciones =  this.retencionesFactura.map(item => item.valor).reduce((a, b) => a + b, 0)
    this.totalRetenciones = Number(this.totalRetenciones.toFixed(2))
  }

}
