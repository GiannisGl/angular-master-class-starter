import {Directive} from '@angular/core';
import {ContactsService} from './contacts.service';
import {AbstractControl, AsyncValidator, FormControl, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Directive({
  selector: '[trmCheckEmailAvailability][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailAvailabilityValidatorDirective,
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective implements AsyncValidator {

  private readonly _validateFn: (AbstractControl) => Observable<ValidationErrors | null>;

  constructor(private contactsService: ContactsService) {
    this._validateFn = checkEmailAvailability(contactsService);
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._validateFn(control);
  }
}

export function checkEmailAvailability(contactsService: ContactsService) {
  return (emailControl: FormControl) => {
    return contactsService.isEmailAvailable(emailControl.value).pipe(
      map(res => res.error ? {emailTaken: true} : null)
    );
  };
}
