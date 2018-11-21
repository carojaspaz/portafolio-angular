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
  productosFiltrado: IProducto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise ( ( resolve, reject ) => {
      this.http.get('https://angular-html-12a02.firebaseio.com/productos_idx.json')
      .subscribe( (resp: IProducto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-12a02.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    if( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
