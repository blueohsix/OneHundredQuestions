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
  deletePorFavor: boolean;

  constructor(private auth: AuthService, private user: UserService) {}

  ngOnInit() {
    if (this.checkLogin()) {
      this.getProfile();
    }
  }
  closeModal() {
    document.getElementById('profileModal').style.display = 'none';
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
    this.currentUser.name = form.value.name;
    this.currentUser.username = form.value.username;
    this.currentUser.password = form.value.password;
    this.currentUser.associateUsername = form.value.associateUsername;
    this.user.updateUser(this.currentUser).subscribe(
      lifeIsGood => {
        this.currentUser = lifeIsGood;
        this.auth.logout();
      },
      whenThingsGoBad => {
        console.error('error in getProfile()');
      }
    );
  }
  deleteAccount(form: NgForm) {
    if (form.value.verify === 'Delete Me') {
      this.user.deleteUser(this.currentUser.id).subscribe(
        lifeIsGood => {
          console.log(this.currentUser.username + ' successfully deleted');
          this.auth.logout();
        },
        whenThingsGoBad => {
          console.error('error in deleteAccount()');
        }
      );
    }

  }
  toggleDelete() {
    this.deletePorFavor = !this.deletePorFavor;
  }
}
