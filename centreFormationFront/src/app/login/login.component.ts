import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { LoginModel } from '../models/login.model';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;//password field control
  user: LoginModel = new LoginModel();
  loginForm: FormGroup;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.loginForm = this.formBuilder.group({
      'username': [this.user.username, [
        Validators.required
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onSubmit(){
    this.authService.login(this.user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.redirect();
        //this.reloadPage();
        //this.delay(3000);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.snackBar.open(this.errorMessage,'',{
          duration:3000,
          verticalPosition:'bottom',
          horizontalPosition:'right'
        })
      }
    );
  }

  reloadPage(){
    window.location.reload();
  }
  redirect() {
    this.router.navigate(['./'], { skipLocationChange: false });
  }
  private delay(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}
}
