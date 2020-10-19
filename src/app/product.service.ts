import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IProduct{
  id: number;
  name: string
  active: boolean;
  expirationDate: string;
  description: string;
  type: string;
  features?: string[]
}

function generateID(){
  return Math.floor(Math.random() * 1000)
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  products: IProduct[] = [{
    id: generateID(),
    name: 'IPhone X',
    active: false,
    description: 'Like Brand New',
    expirationDate: '01/15/2019',
    type: 'mobile'
  },
  {
    id: generateID(),
    name: 'Samsung G7',
    active: false,
    description: 'New',
    expirationDate: '01/22/2020',
    type: 'mobile'
  },
  {
    id: generateID(),
    name: 'Plasma',
    active: false,
    description: 'Used for two months',
    expirationDate: '01/01/2020',
    type: 'TV'
  },
  {
    id: generateID(),
    name: 'Hunda 2015',
    active: false,
    description: '700.000 km',
    expirationDate: '01/08/2021',
    type: 'Car'
  },
  {
    id: generateID(),
    name: 'Kawazaki',
    active: true,
    description: 'New',
    expirationDate: '12/02/2020',
    type: 'Moto-Bike'
  }, {
    id: generateID(),
    name: 'Huawei y4',
    active: false,
    description: 'Old but in a good state',
    expirationDate: '12/12/2020',
    type: 'mobile'
  }
]

products$ = new BehaviorSubject<IProduct[]>(this.products);


  constructor() { }
}
