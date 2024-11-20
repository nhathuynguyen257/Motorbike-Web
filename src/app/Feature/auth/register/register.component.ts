import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  model: RegisterRequest;
  registerSubscription?: Subscription

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      name: '',
      email: '',
      password: '',
      role: '',
    };
  }

  onFormSubmit() {
    if (
      this.model.name != '' &&
      this.model.email != '' &&
      this.model.password != '' &&
      this.model.role != ''
    ) {
      this.registerSubscription = this.authService.register(this.model).subscribe({
        next: (response: any) => {
          this.cookieService.set(
            'Authorization',
            `Bearer ${response.result.token}`,
            undefined,
            '/',
            undefined,
            true
          )

            // Set User
            this.authService.setUser({
              email: response.result.email,
              roles: response.result.roles
            })

            // Redirect back to homepage
          if(response.result.roles[0] != 'Visitor'){
            this.router.navigateByUrl(`/${response.result.roles[0].toLowerCase()}`)
          }

          else{
            this.router.navigateByUrl('')
          }
        },
        error: (response: any) => {
          // will alert error here
        }
      })
    }
  }
}
