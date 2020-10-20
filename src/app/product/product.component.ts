import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

function minDateValidation(date: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
  const forbidden = new Date(control.value) < date;
  return forbidden ? {minDateValidation: {value: control.value}}
  : null;
  };
 }

@Component({
  selector: 'in-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit {
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
        expirationDate: [null, Validators.compose([Validators.required, minDateValidation(new Date())])]
      })
    });
  }

  get basicFeatures(): FormArray{
    return this.productForm.get('basic.features') as FormArray;
  }

  // tslint:disable-next-line: typedef
  get expirationError(){
    if (this.productForm.get('expiration.expirationDate').hasError('required')){
      return 'This Field Is Required!';
    }
    if (this.productForm.get('expiration.expirationDate').hasError('minDateValidation')){
      return ' Expiration should be after today\'s date';
    }
  }
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
  productForm: FormGroup;
  @Input() product;
// tslint:disable-next-line: typedef
selectDevice(device){
  this.deviceType = device.icon;
}

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  handleClose(){}
  // tslint:disable-next-line: typedef
  addFeature(){
    this.basicFeatures.push(this.fb.control(''))
  }

}
