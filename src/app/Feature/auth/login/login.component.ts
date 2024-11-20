import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {
  model: LoginRequest;
  loginSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit() {
    if (this.model.email != '' && this.model.password != '') {
      this.loginSubscription = this.authService.login(this.model).subscribe({
        next: (response: any) => {
          this.cookieService.set(
            'Authorization',
            `Bearer ${response.result.token}`,
            undefined,
            '/',
            undefined,
            true
          );

          // Set User
          this.authService.setUser({
            email: response.result.email,
            roles: response.result.roles
          })

          // Redirect back to homepage
          if(response.result.roles[0] != 'Visitor'){
            this.router.navigateByUrl(`/${response.result.roles[0].toLowerCase()}`)
          }

          // return homepage will code here
          else{
            this.router.navigateByUrl('')
          }
        },
        error: (response) => {
          // will alert error here
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }
}
