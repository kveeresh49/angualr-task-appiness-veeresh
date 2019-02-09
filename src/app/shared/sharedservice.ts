import {Injectable} from '@angular/core';

@Injectable()

export class AngualrSharedService {
 public  myvarible:any;
 constructor() {  }
 login(formValue) {
  this.myvarible = formValue;
 }
}
