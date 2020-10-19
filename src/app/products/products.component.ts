import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {IProduct, ProductService} from '../product.service'

import { Observable } from 'rxjs';

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products$: Observable<IProduct[]> = this.productService.products$
  constructor(private productService: ProductService) { }

  trackById(item){
    return item.id;
  }
  ngOnInit(): void {
  }

}
