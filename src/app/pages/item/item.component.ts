import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ProductoDesc } from 'src/app/interfaces/producto-desc.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDesc;
  prodId: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductoService) { }

  ngOnInit() {
    this.route.params.subscribe ( parametros => {
      console.log(parametros['idProd']);
      this.productoService.getProducto(parametros['idProd'])
          .subscribe ( (producto: ProductoDesc) => {
            this.producto = producto;
            this.prodId = parametros['idProd'];
            console.log(producto);
          });
    });
  }
}
