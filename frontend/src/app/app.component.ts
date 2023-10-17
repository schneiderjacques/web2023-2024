import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private _authService: AuthService, private _router: Router, 
    ) {

   }

    ngOnInit(): void {
      if (!this._authService.isLoggedIn()) {
        this._authService.redirectToLogin();
      }
    }

}
