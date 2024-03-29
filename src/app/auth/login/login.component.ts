import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  isLoading: boolean = false;

  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.loginUser(form.value.email, form.value.password);
    // console.log(form.value);
  }
}
