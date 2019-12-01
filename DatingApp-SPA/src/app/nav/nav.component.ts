import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl : string;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {

    this.authService.login(this.model).subscribe(next =>{
      this.alertify.success('Logged in successfuly');
    }, error => {
      this.alertify.error(error);
    },() => {
      this.router.navigate(['/members']);
    });
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.decodedToken = null;
      this.authService.currentUser = null;
      this.alertify.message('logged oud');
      this.router.navigate(['/home']);

  }

}
