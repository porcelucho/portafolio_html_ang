import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor(public http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    // Se crea una nueva promesa para que el proceso sea asincrono

    return new Promise ( (resolve, reject) => {

      this.http.get('https://angular-html-477d6.firebaseio.com/productos_idx.json')
          .subscribe( (resp: ProductoInterface[]) => {
            this.productos = resp;
            setTimeout(() => {
              this.cargando = false;
            }, 2000);
            resolve();
          });
    });
  }

  getProducto (id: string) {
    return this.http.get(`https://angular-html-477d6.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto (termino: string) {

    if (this.productos.length === 0) {
      // Se deben cargar los productos
      this.cargarProductos().then( () => {
        // Se ejecuta despues de tener cargados los productos
        // y se aplica el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Se puede aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos (termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach ( prod => {
      const tituloLow = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.includes(termino) || tituloLow.includes(termino)) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
