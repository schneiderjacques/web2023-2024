import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserType} from '../shared/types/user.type';
import {HeaderLink} from "../shared/types/app.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})




export class HeaderComponent implements OnInit{
  protected readonly HeaderLink = HeaderLink;
  authUser !: UserType;
  headerLink !: HeaderLink

  constructor(private _authService: AuthService,
              private _router: Router,
              private route: ActivatedRoute) {

    this.route.url.subscribe(segments => {
      if(segments[0] == undefined){
        this.headerLink = HeaderLink.HOME;
      }else if (segments[0].path == 'events'){
        this.headerLink = HeaderLink.EVENTS;
      }
    });
  }
  ngOnInit(): void {
      this._authService.authenticatedUser()
      .subscribe(
        (data :UserType) => {
          this.authUser = data
        }
      )
  }

  navigateToHome(): void{
    this.headerLink = HeaderLink.HOME;
    this._router.navigate(['/'])
  }

  navigateToEvent(): void{
    this.headerLink = HeaderLink.EVENTS;
    this._router.navigate(['/events'])
  }

  logout(): void {
    this._authService.setLoggedIn(false);
    this._router.navigate(['/login']);
  }

}
