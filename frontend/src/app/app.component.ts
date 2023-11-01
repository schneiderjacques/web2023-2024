import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserType } from './shared/types/user.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShareEvent';

  hasTokenExpired : boolean = false;

  constructor(private _authService: AuthService, private _router: Router,
    ) {

   }

    ngOnInit(): void {
      //Catch if the token has expired by calling authenticatedUser() method if it returns unoauthorized error 401
      if(this._authService.hasTokenInLocalStorage()){
      this._authService.authenticatedUser().subscribe(
        (user: UserType) => {
        
        },
        (error) => {
          if(error.status == 401){
            this.hasTokenExpired = true;
          }
        }
      );

    }
  }
    disconnect(): void{
      this._authService.setLoggedIn(false);
      this._router.navigate(['/login']);
    }

}
