import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: IProducto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-12a02.firebaseio.com/productos_idx.json')
    .subscribe( (resp: IProducto[]) => {
      this.productos = resp;
      setTimeout(() => {
        this.cargando = false;
      }, 2000);
    });
  }
}
