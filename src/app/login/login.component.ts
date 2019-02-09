import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngualrSharedService } from '../shared/sharedservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  reg_users: any = [];
  loggedUserDetails: any;
  constructor(private formBuilder: FormBuilder, private router: Router,private angualrSharedService:AngualrSharedService) {
    if (JSON.parse(localStorage.getItem("usersList1")) != undefined) {
      this.reg_users = JSON.parse(localStorage.getItem("usersList1"));
    }
  }

  ngOnInit() {
    console.log(localStorage);
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.checkPassWord();
    this.angualrSharedService.login(this.loginForm);
    this.router.navigate(['/userDetails']);

  }

  checkPassWord() {
    for (let item of this.reg_users) {
      if ((item.userName === this.loginForm.get('userName').value ||
      item.emailGroup.email === this.loginForm.get('userName').value ||
      item.phone === this.loginForm.get('userName').value) &&
      item.passWordGroup.passwordControl === this.loginForm.get('password').value
      ) {
        alert('Loggin success full')
        return;
      }
    }
  }

}



