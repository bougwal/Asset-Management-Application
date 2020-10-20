import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'in-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  deviceType ='tablet';
  deviceTypes =[{
    name: 'Tablet',
    icon: 'tablet',
  },
  {
    name: 'Laptop',
    icon: 'computer',
  },
  {
    name: 'Phone',
    icon: 'mobile',
  },
  {
    name: 'Monitor',
    icon: 'display'
  },
  {
    name: 'Car',
    icon: 'car'
  },
  {
    name: 'Bike',
    icon: 'bicycle'
  }
];
selectDevice(device){
  this.deviceType = device.icon;
}
  productForm: FormGroup;
  @Input() product;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      basic: fb.group({
        name: '',
        description: '',
        active: false,
        features: fb.array([
          fb.control('')
        ])
      }),
      expiration: fb.group({
        expirationDate: null
      })
    });
  }

  ngOnInit(): void {
  }

  handleClose(){}
}
