import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { ClrWizard } from '@clr/angular';
import pick from 'lodash-es';

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

export class ProductComponent implements OnInit, OnChanges {
  @Output() finish = new EventEmitter();
  @ViewChild('productWizard', {static: false}) productWizard: ClrWizard;
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
  },
  {
    name: 'TV',
    icon: 'step-forward-2'
  }
];
  productForm: FormGroup;
  @Input() product;
// tslint:disable-next-line: typedef
selectDevice(device){
  this.deviceType = device.icon;
}

  ngOnInit(): void {
    if (this.product) {
      this.productForm.setValue({
          basic: {
              ...pick(this.product, ['name', 'description', 'active']),
              features: this.product.features || [''],
          },
          expiration: {
            ...pick(this.product, ['expirationDate']),
          }
      });
      this.deviceType = this.product.type;
  }
}
  ngOnChanges(){
    this.ngOnInit();
  }

  // tslint:disable-next-line: typedef
  addFeature(){
    this.basicFeatures.push(this.fb.control(''))
  }

  // tslint:disable-next-line: typedef
  get isBasicInvalid(){
    return this.productForm.get('basic').invalid;
  }
  // tslint:disable-next-line: typedef
  get isExpirationInvalid(): boolean{
    return this.productForm.get('expiration').invalid;
  }
  handleClose(){
    this.finish.emit();
    this.handleClose();
  }
  close(){
    this.productForm.reset();
    this.deviceType = 'tablet';
    this.productWizard.goTo(this.productWizard.pageCollection.pages.first.id);
    this.productWizard.reset()
  }
  // tslint:disable-next-line: typedef
  handleFinish(){
    this.finish.emit({
      product: {
        type: this.deviceType,
        ...this.productForm.get('basic').value,
        ...this.productForm.get('expiration').value,
      }
    });
    this.close()
  }
}
