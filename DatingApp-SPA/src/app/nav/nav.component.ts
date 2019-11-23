import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { NEXT } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe(next =>{
      this.alertify.success('Logged in successfuly');
    }, error => {
      this.alertify.error(error);
    });
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
      localStorage.removeItem('token');
      this.alertify.message('logged oud');
  }

}
