import axios from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  user: object = {};
  petition = axios.create({
    baseURL: environment.apiUrl,
  });

  constructor(private router: Router) {}

  login(username: string, password: string) {
    this.user = { name: username, password: password };
    return this.petition
      .post(`authenticate`, this.user)
      .then((response) => {
        sessionStorage.setItem('token', `Bearer ${response.data.auth_token}`);
        this.router.navigate(['/images']);
      })
      .catch((error) => console.log(error));
  }

  authenticate() {
    return sessionStorage.getItem('token');
  }
}
