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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe(next =>{
      console.log('Logged in successfuly');
    }, error => {
      console.log(error);
    });
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
localStorage.removeItem('token');
console.log('logged oud');
  }

}
