import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  guardar(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  obtener(key: string): string | null {
    return localStorage.getItem( key )
  }
}
