import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { MenuMasterService } from 'src/app/service/menu-master.service';
import Swal from 'sweetalert2';

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
    _id : new FormControl(),
    name : new FormControl("",Validators.required),
    description : new FormControl("",Validators.required)
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
    if (this.menuMasterForm.invalid) {
      return
    }
    console.log(this.dbOps)
    switch(this.dbOps){
    case DbOperation.create:
      
    this._menuService.createMenu(<menuMasterModel>this.menuMasterForm.value).subscribe(()=>{
      this.getMenu()
      this._tosterService.success("new record added in menu",'Success')
    })
    break;
    case DbOperation.update:
      console.log("update called")

      this._menuService.updateMenu(<menuMasterModel>this.menuMasterForm.value).subscribe(()=>{
        this.getMenu()
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
    if(updateMenu){this.menuMasterForm.patchValue(updateMenu)
  }
}

  delete(id:string){
    Swal.fire({
      title:'R u sure ??',
      text:'u will not be able to recover data',
      icon:'question',
      confirmButtonText:"yah..",
      denyButtonText:"nop",
      showCancelButton:true
    }).then((result=>{
      if(result.value){
        this._menuService.deleteMenu(id).subscribe(res=>{
          this.getMenu();
          Swal.fire({
            title:'success',
            text:'data deleted successfully',
            icon:'success'
          })
        })
      }else{
        Swal.fire({
          title:'cancelled',
          text:'operation aborted',
          icon:"error"
        })
      }
    }))
 
  }
}
