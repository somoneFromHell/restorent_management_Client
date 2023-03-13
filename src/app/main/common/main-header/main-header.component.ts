import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent {

  constructor( private _authService:AuthService){}


  onclick(){
    this._authService.logout()
  }

}
