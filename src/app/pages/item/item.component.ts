import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { ProductosService } from '../../services/productos.service';

// Interfaces
import { IItem } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id: string;
  producto: IItem;

  constructor( private route: ActivatedRoute,
    public productoService: ProductosService ) { }

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
      this.productoService.getProducto(parametros['id'])
      .subscribe( (producto: IItem) => {
        this.id = parametros['id'];
        this.producto = producto;
      });
    });
  }

}
