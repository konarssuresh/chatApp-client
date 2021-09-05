import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loggedInUser: any;
  usersList: any[] = [];

  constructor(private router: Router, private loginService: LoginService) {
    const stateData: any = this.router?.getCurrentNavigation()?.extras?.state;
    console.log(stateData);
    if (stateData != undefined) {
      this.loggedInUser = stateData.userData;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    console.log(this.loggedInUser.userId);
    this.loginService.getUsers().subscribe((data) => {
      this.usersList = data;
    });
  }

  showUser = (userId: string): boolean => {
    return this.loggedInUser.userId == userId ? false : true;
  };

  goToChatPage = (chatWith: string) => {
    console.log(chatWith);
    this.router.navigateByUrl('/chat', {
      state: { loggedInUser: this.loggedInUser, chatWith },
    });
  };
}
