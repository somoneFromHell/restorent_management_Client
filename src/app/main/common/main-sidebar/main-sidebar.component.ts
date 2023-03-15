import { Component, OnInit } from '@angular/core';
import { pageModel, UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent implements OnInit {

  constructor(private _authService:AuthService){}

   User = this._authService.userData();  
   username:string = "" 
   listOfPages:pageModel[] = []
   userImage:string = `${environment.apiURL}/userImages/${this.User.Data.profileImage}`


  ngOnInit(){
   this.username =`${this.User.Data.firstName} ${this.User.Data.lastName}`
   this.getNaveItems()
   console.log(this.userImage)
  }


  getNaveItems(){
      this.User.pages.forEach((element:pageModel) => {
        if (element.navItem) {
          this.listOfPages.push(element)
        }
      });



    }
}
