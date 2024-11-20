import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

export const VisitorGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  // Check for the JWT token
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwt_decode(token);

    // check if token has expired
    const expirationDate = decodedToken.exp * 1000; // covert to milliseconds
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      // token is still valid

      if (user.roles.includes('Visitor')) {
        return true;
      }
      return false;
    }
  }

  return true;
};
