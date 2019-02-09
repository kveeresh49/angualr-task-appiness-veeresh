import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

export class SignUpFormModel {
  userName: Array<any> = ['', [Validators.required, Validators.minLength(3)]];
  firstName: Array<any> = ['', [Validators.required, Validators.minLength(3)]];
  phone: Array<any> = ['', [Validators.required, Validators.minLength(10)]];
  addressFormControl: Array<any> = ['', [Validators.required, Validators.minLength(5)]];

}

export class EmailGroup {
  email = ['', [Validators.required, Validators.email]];
  confirmEmail = ['', Validators.required];
}

export class PassWordGroup {
  // tslint:disable-next-line:max-line-length
  passwordControl: Array<any> = ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]];
  // tslint:disable-next-line:max-line-length
  conformpasswordControl: Array<any> = ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]];
}
