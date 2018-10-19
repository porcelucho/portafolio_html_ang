import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPaginaInterface } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  // se declara la variable dataCargada para decir q ya fue cargado correctamente
  // se declara la variable info para asignar la resp a esta
  info: InfoPaginaInterface = {};
  dataCargada = false;

  equipo: any[] = [];
  equipoCargado = false;

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Aca declaro lo necesario para leer archivo
    this.http.get('assets/data/data-pagina.json').subscribe( resp => {
          this.dataCargada = true;
          this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-477d6.firebaseio.com/equipo.json').subscribe( (resp: any[]) => {
      this.dataCargada = true;
      this.equipo = resp;
      this.info.equipo_work = resp;
    });
  }
}
