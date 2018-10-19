import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-477d6.firebaseio.com/productos_idx.json')
        .subscribe( resp => {
        console.log(resp);
    });
  }
}
