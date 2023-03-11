import { Component, OnInit } from '@angular/core';
import { pageModel } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(private _authService:AuthService){}

   User = this._authService.userData();  
   username:string = "" 
   listOfPages:pageModel[] = []

  ngOnInit(){
   this.username =`${this.User.Data.firstName} ${this.User.Data.lastName}`
   this.getNaveItems()
  }


  getNaveItems(){
    

      this._authService.userData().pages.forEach((element:pageModel) => {
        if (element.navItem) {
          this.listOfPages.push(element)
        }
      });
    }
}
