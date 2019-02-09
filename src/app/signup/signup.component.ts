import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { EmailGroup, SignUpFormModel, PassWordGroup } from './signup.model';
import { Router } from '@angular/router';
import { AngualrSharedService } from '../shared/sharedservice';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  // customer = new Customer();
  signUpFormDetails: SignUpFormModel = new SignUpFormModel();
  passWordFormGroup: PassWordGroup = new PassWordGroup();
  emailGroup: EmailGroup = new EmailGroup();
  reg_usersList1 = [];
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };


  constructor(private fb: FormBuilder, private route: Router, private sharedService: AngualrSharedService) {
    if (localStorage.getItem('usersList1') !== null ) {
      this.reg_usersList1 = JSON.parse(localStorage.getItem('usersList1'));
      console.log(this.reg_usersList1);
    }
  }

  ngOnInit() {
    this.signupform = this.fb.group({
      ...this.signUpFormDetails,
      passWordGroup: this.fb.group({
        ...this.passWordFormGroup
      }),
      emailGroup: this.fb.group({
        ...this.emailGroup
      }, { validator: emailMatcher }),
    });


    const emailControl = this.signupform.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }




  save() {
    console.log(this.signupform);
    console.log('Saved: ' + JSON.stringify(this.signupform.value));
    let data = this.reg_usersList1.push(this.signupform.value);
    localStorage.setItem("usersList1", JSON.stringify(this.reg_usersList1));
    console.log(this.reg_usersList1);
    console.log(localStorage);
    this.route.navigate(['/login']);

  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    console.log(this.validationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages[key]).join(' ');
    }
  }

  addAddress() {
    // this.addAddress.push(this.buildAddress())
  }


  setNotification(notifyVia: string): void {
    const phoneControl = this.signupform.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  populateTestData() {
    this.signupform.patchValue(
      // tslint:disable-next-line:max-line-length
      { 'firstName': 'Suresh', 'lastName': 'Vemula', 'phone': '9502788190', 'notification': 'email', 'rating': 5, 'sendCatalog': true, 'emailGroup': { 'email': 'suresh.vemula@gmail.com', 'confirmEmail': 'suresh.vemula@gmail.com' }, 'addresses': [{ 'addressType': 'home', 'street1': 'Gachibowli', 'street2': 'Sivalayam Street', 'city': 'Hyderabad', 'state': 'AZ', 'zip': 533234 }, { 'addressType': 'home', 'street1': '', 'street2': '', 'city': '', 'state': '', 'zip': '' }] }
    );
  }

}
