import { Component, OnInit } from '@angular/core';
import { AngualrSharedService } from '../shared/sharedservice';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetails:any;
  logginData :FormGroup;
  sessionData :any;

  constructor(private angualrSharedService:AngualrSharedService,private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem("usersList1")!=undefined){
      this.userDetails = JSON.parse(localStorage.getItem("usersList1"));
    }
    console.log(this.userDetails );

    this.gettingDdetails();
    console.log(this.sessionData);

  }

  gettingDdetails()  {
    this.logginData = this.angualrSharedService.myvarible;
    for (let item of this.userDetails)  {
     if(item.userName === this.logginData.get('userName').value ) {
       this.sessionData  = item;
       return item;
     }
    }
  }
  logoutUser() {
    this.route.navigate(['/signup']);
  }

}
