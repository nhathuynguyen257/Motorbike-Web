import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Feature/auth/models/user.model';
import { AuthService } from 'src/app/Feature/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user?: User

  constructor(private authService: AuthService,
              private router: Router
  ){
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response
      }
    })

    this.user = this.authService.getUser();
  }

  onLogout():void{
    this.authService.logout()
    this.router.navigateByUrl('/')
  }
}
