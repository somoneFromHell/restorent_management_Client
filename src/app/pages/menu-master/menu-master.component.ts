import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { MenuMasterService } from 'src/app/service/menu-master.service';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.css']
})
export class MenuMasterComponent{
  constructor(private _menuService:MenuMasterService,private _tosterService:ToastrService ) {}
  buttonText = "submit";
  menuList: menuMasterModel[] = [];
  dbOps:DbOperation = DbOperation.create

  menuMasterForm = new FormGroup({
    name : new FormControl("",Validators.required),
    discription : new FormControl("",Validators.required)
  })

  ngOnInit() {
    this.getMenu()
  }

  getMenu(){
    this._menuService.getAllMenu().subscribe((res:any)=>{
      this.menuList = res
      console.log(this.menuList)
    })
  }


  onSubmit(){
    switch(this.dbOps){
    case DbOperation.create:
      console.log("called")
    this._menuService.createMenu(<menuMasterModel>this.menuMasterForm.value).subscribe(()=>{
      this._tosterService.success("new record added in menu",'Success')
    })
    break;
    case DbOperation.update:
      this._menuService.updateMenu(<menuMasterModel>this.menuMasterForm.value).subscribe(()=>{
        this._tosterService.success('record updated','success')
      })  
    break;
  }}

  onCancell(){
    this.menuMasterForm.reset();
    this.buttonText = "save"
  }

  edit(id:string){
    console.log(id)
    this.buttonText='update'
    this.dbOps = DbOperation.update
    const updateMenu = this.menuList.find((menu:menuMasterModel)=>menu._id === id)
    if(updateMenu){
    this.menuMasterForm.patchValue(updateMenu)
  }
}

  delete(id:string){

  }

  

}
