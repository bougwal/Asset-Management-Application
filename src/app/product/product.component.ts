import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        name: ['', Validators.required],
        description: ['', Validators.required],
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

  // tslint:disable-next-line: typedef
  handleClose(){}

  get basicFeatures(): FormArray{
    return this.productForm.get('basic.features') as FormArray;
  }
  // tslint:disable-next-line: typedef
  addFeature(){
    this.basicFeatures.push(this.fb.control(''))
  }
}
