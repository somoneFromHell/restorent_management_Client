import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  showProfile: boolean = false;
  showEditForm: boolean = true;
  selectedImageFile: string;
  dbops = DbOperation.create
  submitted = false



  imageSrc: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png'

 



  constructor(private _authService: AuthService,private _toster:ToastrService) { }

  username = ""
  User = this._authService.userData();

  ngOnInit() {
    this.username = `${this.User.Data.firstName} ${this.User.Data.lastName}`
  }

  EditProfileForm = new FormGroup({
    _id:new FormControl(null),
    firstName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.maxLength(3)])),
    lastName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), , Validators.maxLength(3)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    birthDate: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
    address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(20)])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    profilepic: new FormControl(null)

  });

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    if (event.target.files && this.selectedImageFile) {
      const imagefile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(imagefile);
      this.EditProfileForm.patchValue(
        { profilepic: this.selectedImageFile }
      )
    }
  }

  shiftPages() {
    this.showProfile = true;
    this.showEditForm = false;
  }

  onSubmit() {
    const formdata: any = new FormData();
    formdata.append('_id', this.EditProfileForm.get('_id').value)
    formdata.append('firstName', this.EditProfileForm.get('firstName').value)
    formdata.append('lastName', this.EditProfileForm.get('lastName').value)
    formdata.append('email', this.EditProfileForm.get('email').value)
    formdata.append('birthDate', this.EditProfileForm.get('birthDate').value)
    formdata.append('address', this.EditProfileForm.get('address').value)
    formdata.append('gender', this.EditProfileForm.get('gender').value)
    formdata.append('profilepic', this.EditProfileForm.get('profilepic').value)
    console.log(formdata)
    this._authService.EditprofileData(formdata).subscribe(() => {
      this.shiftPages()
      this._toster.success("new food item added in menu", 'Success')
    })
  }

  edit() { 
    this.shiftPages()
    console.log(this.User)

    const profileData:any = this._authService.getProfiledata(this.User.Data).subscribe(res=>{
      this.EditProfileForm.patchValue(res)
    })
    console.log(profileData)
    
  }
}
