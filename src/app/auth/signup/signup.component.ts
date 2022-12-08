import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public route: ActivatedRoute) {

  }

  isLoading: boolean = false;

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}
