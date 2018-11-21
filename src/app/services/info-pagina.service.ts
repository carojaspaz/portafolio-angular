import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { IInfoPagina } from '../interfaces/info-pagina.interface';
import { IEquipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: IInfoPagina = {};
  equipo: IEquipo[] = [];
  cargada = false;

  constructor(private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
   }

   private cargarInfo() {
     // Leer JSON
     this.http.get('assets/data/data-pagina.json')
     .subscribe( (resp: IInfoPagina) => {
       this.cargada = true;
       this.info = resp;       
      });
    }

    private cargarEquipo() {
      this.http.get('https://angular-html-12a02.firebaseio.com/equipo.json')
     .subscribe( (resp: IEquipo[]) => {
       this.equipo = resp;       
      });
    }
  }
