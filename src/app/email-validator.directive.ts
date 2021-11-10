import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[trmEmailValidator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useValue: validateEmail, multi: true}
  ]
})
export class EmailValidatorDirective {

  constructor() { }

}
const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

export function validateEmail(c: FormControl) {
  return VALID_EMAIL.test(c.value) || c.value === '' ? null : {
    validateEmail: {
      valid: false
    }
  };
}
