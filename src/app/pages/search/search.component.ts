import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              public productoService: ProductoService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.productoService.buscarProducto(params['termino']);
    });
  }

}
