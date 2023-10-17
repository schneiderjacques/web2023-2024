import { Component } from '@angular/core';
import { LoginType } from '../shared/types/login.type';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  error: string = '';
  private readonly _form: FormGroup;

  constructor(private _authService: AuthService, private _router: Router
    ) { 
      this._form = this._buildForm();
    }

    ngOnInit(): void {
      if (this._authService.isLoggedIn()) {
        this._router.navigate(['/']);
      }
    }

    get form(): FormGroup {
      return this._form;
    }

    public login(f: LoginType): void {
      this._authService.login(f).subscribe(
      () => {
        console.log("connexion réussie");
        this._router.navigate(['/']);
      },
      (err) => {
        console.log("erreur connexion");
        this.error = err.error.message;
      }
    );
    }


    private _buildForm(): FormGroup {
      return new FormGroup({
        mail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
    }
}
