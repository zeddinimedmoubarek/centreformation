import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { RegisterModel } from '../models/register.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;//password field control

  //Register start
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  //Register end

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit (){
    this.registerForm = this.formBuilder.group({
      'username': [this.user.username, [
        Validators.required,
        Validators.minLength(3),
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onSubmit(){
    this.authService.register(this.user).subscribe(
      data =>{
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.snackBar.open('User registered successfully!', '',{
          duration:3000,
          verticalPosition:'bottom',
          horizontalPosition:'right'})
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
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

}
