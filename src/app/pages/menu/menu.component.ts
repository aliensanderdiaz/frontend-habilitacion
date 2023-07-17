import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, distinctUntilChanged, filter, tap } from 'rxjs';

function dummyValidator(control: FormControl) {
  console.log({ message: 'checking...', control})
  return null;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, OnInit {

  valor = 'fernAndo'

  // public myForm: FormGroup = this.fb.group({
  //   telefono: ['', [Validators.required, dummyValidator]]
  // })

  // public subscriptions = new Subscription();

  // constructor(private fb: FormBuilder) { }
  constructor() { }

  ngOnInit(): void {
    // this.myForm.get('telefono')!.valueChanges
    //   .pipe(
    //     distinctUntilChanged(),
    //     // filter(v => v.length > 3),
    //     tap(console.log))
    //   .subscribe(
    //     {
    //       next: (data: any) => {
    //         console.log({ data, value: this.myForm.get('telefono')?.value })
    //       }
    //     }
    //   )
  }

  onSubmit() {
    console.log()
  }

  ngOnDestroy(): void {

  }

  // evaluar(event: any) {
  //   let retorno = event.keyCode > 47 && event.keyCode < 58
  //   console.log({ funcion: 'evaluar', event, retorno })
  //   return retorno
  // }

  anterior = ''
  cantidadAnteriorDeNumeros = 0

    onInput(event: any) {
      let expresionRegularEspaciosDigitos = /^[0-9\s]+$/g
      this.cantidadAnteriorDeNumeros = this.anterior.length
      const value = event.target.value
      const cantidadDeNumeros = value.length
      const estoyBorrando = cantidadDeNumeros < this.cantidadAnteriorDeNumeros
      const isValid = expresionRegularEspaciosDigitos.test( value )
      console.log({ mensaje: 'Antes del control', value, cantidadDeNumeros, estoyBorrando, isValid })
      if (!isValid || cantidadDeNumeros > 13) {
        console.log('AQUI 1')
        if (value !== '') {
          event.target.value = this.anterior
        } else {
          this.anterior = value
        }
      } else {
        console.log('AQUI 2')
        let valorTemporal = value
        if (!estoyBorrando && (cantidadDeNumeros === 3 || cantidadDeNumeros === 7 || cantidadDeNumeros === 10)) {
          console.log('AQUI 3')
          valorTemporal = value + ' '
          event.target.value = valorTemporal
        }
        this.anterior = event.target.value
      }

      console.log({mensaje: 'Despues del control',  'event.target.value': event.target.value, cantidadDeNumeros })
    }

    anteriorV2 = ''
    cantidadAnteriorDeNumerosV2 = 0

      onInputV2(event: any) {
        console.log({ mensaje: 'Inicio Funcion' })

        const value: string = event.target.value

        if (value === '') {
          console.log('BORRE TODO')
          this.anterior = ''
          return
        }


        let expresionRegularEspaciosDigitos = /^[0-9\s]+$/g

        const cantidadDeNumeros = value.length
        const estoyBorrando = cantidadDeNumeros < this.anterior.length

        if (estoyBorrando) {
          console.log('Borrando uno por uno')
          this.anterior = value
          return
        }
        const isValid = expresionRegularEspaciosDigitos.test( value )

        console.log({ mensaje: 'Antes del control', 'event.target.value': value, cantidadDeNumeros, isValid })

        if (!isValid || cantidadDeNumeros > 13) {
          console.log('AQUI 1')
          event.target.value = this.anterior
        } else {
          console.log('AQUI 2')
          let valueTemp = value.replaceAll(' ', '')
          console.log({ valueTemp })
          let grupo1 = valueTemp.slice(0,3)
          let grupo2 = valueTemp.slice(3,6)
          let grupo3 = valueTemp.slice(6,8)
          let grupo4 = valueTemp.slice(8,10)
          console.log({ grupo1, grupo2, grupo3, grupo4 })
          let valueConEspacios = grupo1
          if (grupo2) {
            valueConEspacios = valueConEspacios + ' ' + grupo2
          }
          if (grupo3) {
            valueConEspacios = valueConEspacios + ' ' + grupo3
          }
          if (grupo4) {
            valueConEspacios = valueConEspacios + ' ' + grupo4
          }
          event.target.value = valueConEspacios
          this.anterior = valueConEspacios
        }

        console.log({mensaje: 'Despues del control',  'event.target.value': event.target.value, cantidadDeNumeros })
        return


      }

  // evaluarUp(event: any) {
  //   let retorno = event.keyCode !== 229
  //   console.log({ funcion: 'evaluarUp', event, retorno })
  //   return retorno
  // }
}
