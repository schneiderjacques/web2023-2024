// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginType } from '../types/login.type';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environements/environement';
import { Observable, catchError, map, of } from 'rxjs';
import { registerType } from '../types/register.type';
import { UserType } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private token: string | null = null;

  private readonly _backendURL: any;


  constructor(private router: Router, private _http: HttpClient) {
    // Récupérer le token du stockage local lors du chargement du service
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      this.setToken(storedToken);
      this.isAuthenticated = true;
    }

    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(
      (k) =>
        // @ts-ignore
        (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  hasTokenInLocalStorage(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  // Méthode pour vérifier l'état de connexion
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Méthode pour définir l'état de connexion et sauvegarder le token
setLoggedIn(value: boolean, token: string | null = null): void {
  this.isAuthenticated = value;
  if (value && token !== null) {
    this.setToken(token);
  } else {
    this.clearToken();
  }
}

  // Méthode pour sauvegarder le token dans le stockage local
  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('jwtToken', token);
  }

  // Méthode pour effacer le token du stockage local
  private clearToken(): void {
    this.token = null;
    localStorage.removeItem('jwtToken');
  }

  // Méthode pour récupérer le token actuel
  getToken(): string | null {
    return this.token;
  }

  // Méthode pour rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  redirectToLogin(): void {
    console.log('redirectToLogin');
    this.router.navigate(['/login']);
  }

  login(login: LoginType): Observable<boolean> {
    return this._http.post<String>(this._backendURL.login, login).pipe(
      map((res: any) => {
        this.setLoggedIn(true, res.access_token);
        return true;
      }),
      catchError((error) => {
        console.error('Error during register:', error);
        throw error;
      })
    );
  }

  register(register: registerType): Observable<boolean> {
    return this._http.post<String>(this._backendURL.register, register).pipe(
      map((res: any) => {
        console.log(res);
        return true;
      }),
      catchError((error) => {
        //throw error
        console.error('Error during register:', error);
        throw error;

      })
    );
  }

  authenticatedUser(): Observable<UserType> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this._http.get<UserType>(this._backendURL.profil, {headers})
  }

  mailConfirmation(token: string): Observable<string> {
    const params = new HttpParams().set("token", token);
    return this._http.get<string>(this._backendURL.mailConfirm, { params}).pipe(
      map((payload) => {
        console.log(payload);
        console.log('mail sent');
        return payload;
      }),
      catchError((error) => {
        console.error('Error checking mail:', error);
        throw error;
      })
    );
  }


}
