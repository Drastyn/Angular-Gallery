import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  ngOnInit(): void {}

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    if (username && password) {
      this.loginService.login(username, password);
    }
  }
}
