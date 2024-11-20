import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from 'src/app/Core/models/api-response.model';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(request: LoginRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiBaseUrl}/auth/login`,
      request
    );
  }

  register(request: RegisterRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiBaseUrl}/auth/register`,
      request
    );
  }

  setUser(user: User): void {

    this.$user.next(user)

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined>{
    return this.$user.asObservable()
  }

  getUser(): User | undefined{
    const email = localStorage.getItem('user-email')
    const roles = localStorage.getItem('user-roles')

    if(email && roles){
      const user: User = {
        email: email,
        roles: roles.split(',')
      }
      return user
    }
    return undefined
  }

  logout(): void{
    localStorage.clear()
    this.cookieService.delete('Authorization', '/')
    this.$user.next(undefined)
  }
}
