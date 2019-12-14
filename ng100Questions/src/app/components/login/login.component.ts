import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  requestLogin: boolean;
  failed: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggle() {
  this.requestLogin = !this.requestLogin;
  }

  login(loginForm) {
    this.auth
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe(
        data => {
          this.failed = false;
          console.log('login(): user logged in.');
        },
        err => {
          this.failed = true;
          console.error('login(): error logging in.');
          console.error(err);
        }
      );
  }
}
