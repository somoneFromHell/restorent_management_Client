import { Component, OnInit } from '@angular/core';
import { pageModel, UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent implements OnInit {

  constructor(private _authService:AuthService){}

   User:UserModel = this._authService.userData();  

   username:string = "" 
   listOfPages:pageModel[] = []

  ngOnInit(){
   this.username =`${this.User.firstName} ${this.User.lastName}`
   this.getNaveItems()
  }


  getNaveItems(){
      this.User.pages.forEach((element:pageModel) => {
        if (element.navItem) {
          this.listOfPages.push(element)
        }
      });

      console.log(this.User.role)

    }
}
