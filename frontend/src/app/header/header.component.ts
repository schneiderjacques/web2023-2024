import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _authService: AuthService, private _router: Router) { 
    
  }

  logout(): void {
    this._authService.setLoggedIn(false);
    this._router.navigate(['/login']);
  }

}
