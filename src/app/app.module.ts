import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AngualrSharedService } from './shared/sharedservice';
import { LoginComponent } from './login/login.component';
import { UserDataComponent } from './user-data/user-data.component';

@NgModule({
  declarations: [
    AppComponent,
        SignupComponent,
    UserDetailsComponent,
    LoginComponent,
    UserDataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'userDetails', component: UserDetailsComponent },
    ]),

  ],
  providers: [AngualrSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
