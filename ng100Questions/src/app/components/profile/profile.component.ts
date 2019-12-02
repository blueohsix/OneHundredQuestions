import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  editPorFavor: boolean;

  constructor(private auth: AuthService, private user: UserService) {}

  ngOnInit() {
    if (this.checkLogin()) {
      this.getProfile();
    }
  }
  checkLogin() {
    if (!this.auth.checkLogin()) {
      this.currentUser = null;
      this.currentUser = new User();
    }
    return this.auth.checkLogin();
  }
  getProfile() {
    this.user.showByUsername(this.auth.getUsername()).subscribe(
      lifeIsGood => {
        this.currentUser = lifeIsGood;
      },
      whenThingsGoBad => {
        console.error('error in getProfile()');
      }
    );
  }
  editAccount(form: NgForm) {
    console.log(form.value);
    console.log(this.user);

  }
  toggle() {
    this.editPorFavor = !this.editPorFavor;
  }
}
