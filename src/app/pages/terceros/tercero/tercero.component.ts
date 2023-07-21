import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tercero',
  templateUrl: './tercero.component.html',
  styleUrls: ['./tercero.component.css']
})
export class TerceroComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private apiService = inject(ApiService)
  public cargando = true
  public error = false
  public tercero: any

  ngOnInit(): void {
    this.cargarTercero()
  }

  cargarTercero() {
    const terceroId = this.activatedRoute.snapshot.params['id']
    this.apiService.peticionGet('api/v1/usuarios/' + terceroId)
    .subscribe({
      next: (response: any) => {
        console.log({ response })
        this.cargando = false
        this.tercero = response.data
      }
    })
  }
}
