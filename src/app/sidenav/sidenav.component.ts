import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: SidenavComponent;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  openSidenav() {
    this.sidenav.openNav();
  }
  get loginStatus() {
    return this.loginService.loggedIn;
  }
  logout() {
    this.loginService.logout();
  }


  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
  }

  closeNav() {
      document.getElementById('mySidenav').style.width = '0';
  }

}
