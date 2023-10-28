import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {LoadingState} from "../shared/types/app.type";

@Component({
  selector: 'app-mail-confirmation',
  templateUrl: './mail-confirmation.component.html',
  styleUrls: ['./mail-confirmation.component.css']
})
export class MailConfirmationComponent  implements OnInit {
  private _token !: string | null;
  private _loadingState !: LoadingState ;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _authService : AuthService) {
    this._loadingState = LoadingState.LOADING;

  }

  ngOnInit() {
    // Access the 'id' route parameter
    console.log()
    this._token = this.route.snapshot.paramMap.get('token');
    this._loadingState = LoadingState.LOADING;
    if (this._token != null) {
      this._authService.mailConfirmation(this._token).
      subscribe(
        payload => {
            console.log(payload)
            this._loadingState = LoadingState.LOADED
        },
        (error) =>  {
          console.log(error)
          this._loadingState = LoadingState.ERROR  // modifier
        }
      )
    }
  }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
  }

  get loadingState(): LoadingState {
    return this._loadingState;
  }

  set loadingState(value: LoadingState) {
    this._loadingState = value;
  }

  loginPage(){
    this.router.navigate(['/login']);
  }

  protected readonly LoadingState = LoadingState;
}



