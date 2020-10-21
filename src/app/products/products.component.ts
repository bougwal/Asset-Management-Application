import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IProduct, ProductService} from '../product.service'

import { Observable } from 'rxjs';

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  productOpen;
  selectedProduct: IProduct;
  addProduct(){
    this.productOpen = true;
    this.selectedProduct = undefined;
  }
  onEdit(product){
    this.productOpen = true;
    this.selectedProduct = product;
  }
  handleFinish(event){
    if(event && event.product){
      if(this.selectedProduct){
        this.productService.editProduct(this.selectedProduct.id, event.product);
      }
      else{
        this.productService.addPoduct(event.product);
      }
    }
    this.productOpen = false
  }
  products$: Observable<IProduct[]> = this.productService.products$;
  delete = false;
  productToBeDeleted;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  onDelete(product){
    this.delete = true;
    this.productToBeDeleted = product;
  }
  handleCancel(){
    this.delete = false;
  }
  confirmDelete(){
    this.handleCancel()
    // remove product in our products service
    this.productService.removeProduct(this.productToBeDeleted);
  }
  trackById(index, item){
    return item.id;
  }
}
