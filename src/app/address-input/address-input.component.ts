import { Component, OnInit } from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Address} from '../models/contact';
import {COUNTRIES_DATA} from '../data/countries-data';

@Component({
  selector: 'trm-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressInputComponent,
      multi: true
    }
  ]
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {

  readonly countries = COUNTRIES_DATA;
  form: FormGroup;
  propagateChange: (_: Address) => {};
  propagateTouch: () => {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      street: '',
      zip: '',
      city: '',
      country: ''
    });
    this.form.valueChanges.subscribe((address) => this.propagateChange(address));
  }

  writeValue(address: Address): void {
    this.form.patchValue(address, {emitEvent: false}); // do not emit changes
  }

  registerOnChange(fn: (_: Address) => {}): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.propagateTouch = fn;
  }

}
