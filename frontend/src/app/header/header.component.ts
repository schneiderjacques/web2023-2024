import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserType } from '../shared/types/user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  authUser !: UserType;

  constructor(private _authService: AuthService, private _router: Router) {

  }
  ngOnInit(): void {
      this._authService.authenticatedUser()
      .subscribe(
        (data :UserType) => {
          this.authUser = data
        }
      )
  }



  logout(): void {
    this._authService.setLoggedIn(false);
    this._router.navigate(['/login']);
  }

}
