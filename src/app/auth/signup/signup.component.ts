import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public authService: AuthService, public route: ActivatedRoute) {}

  isLoading: boolean = false;

  onSignup(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
