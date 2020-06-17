import { UserService, User, Permission } from '../../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenu = false;
  public currentUser: User;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  public isAdmin() {
    return this.currentUser.permission === Permission.ADMIN;
  }

}