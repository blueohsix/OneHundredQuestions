import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registered: boolean;
  createNew: boolean;
  toggleText: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.toggleText = 'New Account';
  }

  checkLogin() {
    return this.auth.checkLogin();
  }
  toggle() {
  this.createNew = !this.createNew;
  }
  register(registerForm: NgForm) {
    console.log('Register Form: ' + registerForm.value.name);
    const user: User = registerForm.value;
    user.name = registerForm.value.name;
    user.username = registerForm.value.username;
    user.password = registerForm.value.password;
    user.associateUsername = registerForm.value.associateUsername;
    user.enabled = 1;
    user.role = 'user';
    console.log('User: ' + user.name);

    this.auth.register(user).subscribe(
      data => {
        this.createNew = false;
        this.toggleText = 'New Account';
        console.log('register(): user registered.');
      },
      err => {
        console.error('register(): error registering.');
        console.error(err);
      }
    );
  }
}
