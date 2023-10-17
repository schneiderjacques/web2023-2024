import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { registerType } from '../shared/types/register.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  errors: string = '';
  private readonly _form: FormGroup;
  
  success: boolean = false;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this._form = this._buildForm();
   }
   get form(): FormGroup {
      return this._form;
    }

    private _buildForm(): FormGroup {
      //Example
      //Psedo : Ddddazdazd
      //Mail : test@test
      //Password : Test1234
      return new FormGroup({
        pseudo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,16}$/)]
        ),
        mail: new FormControl('', [Validators.required, Validators.email]),
        //Mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre
        password: new FormControl('', [Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/)]),
      });
    }

    register(registerType: registerType){
      this._authService.register(registerType).subscribe(
        (res) => {
          this.success = true;
        },
        (err) => {
          console.log("erreur inscription");
          this.errors = err.error.message;
        }
      );

    }



}
