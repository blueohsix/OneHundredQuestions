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
  failed: boolean;
  registered: boolean;
  createNew: boolean;
  toggleText: string;
  takenUsername: boolean;
  blankUsername: boolean;
  blankPassword: boolean;
  blankName: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.toggleText = 'New Account';
  }

  closeModal() {
    document.getElementById('registerModal').style.display = 'none';
  }

  checkLogin() {
    return this.auth.checkLogin();
  }
  toggle() {
  this.createNew = !this.createNew;
  }
  register(registerForm: NgForm) {
    const user: User = registerForm.value;
    // tslint:disable-next-line: no-unused-expression
    registerForm.value.name ? (user.name = registerForm.value.name) && (this.blankName = false) : this.blankName = true;
    // tslint:disable-next-line: no-unused-expression
    registerForm.value.username ? (user.username = registerForm.value.username) && (this.blankUsername = false) : this.blankUsername = true;
    // tslint:disable-next-line: no-unused-expression
    registerForm.value.password ? (user.password = registerForm.value.password) && (this.blankPassword = false) : this.blankPassword = true;
    user.associateUsername = registerForm.value.associateUsername;
    user.enabled = 1;
    user.role = 'user';

    if (!this.blankName && !this.blankPassword && !this.blankUsername) {
    this.auth.register(user).subscribe(
      data => {
        this.takenUsername = false;
        this.blankPassword = false;
        this.blankName = false;
        this.blankUsername = false;
        this.createNew = false;
        this.toggleText = 'New Account';
        console.log('register(): user registered.');
        this.closeModal();
      },
      err => {
        this.takenUsername = true;
        console.error('register(): error registering.');
        console.error(err);
      }
    );
    }
  }
}
