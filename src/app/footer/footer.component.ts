import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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

}
