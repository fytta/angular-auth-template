import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LoginUser } from 'src/app/models/login-user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;

  loginUser: LoginUser;
  username: string;
  password: string;
  roles: string[] = [];
 
  loginFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private tokenService: TokenService, 
              private authService: AuthService, 
              private router: Router
  ) {}

  onLogin(): void {
    console.log("onLogin!");

    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);

        this.roles = data.authorities;

        alert("Welcome " + this.loginUser.username + "\nYou will be redirected to the dashboard");
        this.router.navigate(['/home']);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;

        console.log(err)
      }
    );
  }

  onLogout(): void {
    this.tokenService.logout();
    this.isLogged = false;
    console.log("Logout!");
  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

}
