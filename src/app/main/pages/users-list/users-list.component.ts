import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {

modalStatus: any;
submitted: any;
userinf:UserModel;
usersList: Array<UserModel> = [];
Imagepath: any =`${environment.apiURL}/userImages`
  rolesList: any;


constructor(private _users:AuthService){
}


  ngOnInit(){
      console.log(this.getRoles())
      this.getUsers()
  }

  getUsers(){this._users.getAllUsers().subscribe((res:any)=>{this.usersList=res})}
  getRoles(){this._users.getAllRoles().subscribe((res:any)=>{this.rolesList=res})}

  addUserForm = new FormGroup({
    _id: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
    
  })

  onSubmit() {
     this._users.registerUser(this.addUserForm.value.email , this.addUserForm.value.password)
  }
  
  onCancel() {
  throw new Error('Method not implemented.');
  }

  userInfo(userId: any)  {
    this._users.getUserById(userId).subscribe((res:any)=>this.userinf =res)
    console.log(this.userinf)

    }
  
}
