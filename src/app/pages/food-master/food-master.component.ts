import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { FoodService } from 'src/app/service/food.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';

@Component({
  selector: 'app-food-master',
  templateUrl: './food-master.component.html',
  styleUrls: ['./food-master.component.css']
})
export class FoodMasterComponent {

  constructor(private _foodService: FoodService,private _menuService:MenuMasterService, private _toster: ToastrService) { }

  dbops = DbOperation.create
  submitted = false
  buttonText = "save"
  modalStatus = "modal"
  foodList: foodMasterModel[] = []
  menuList: menuMasterModel[] = []


  foodForm = new FormGroup({
    _id: new FormControl(),
    food: new FormControl('', Validators.required),
    discription: new FormControl(''),
    price: new FormControl(0, Validators.required),
    foodImage: new FormControl('https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'),
    menuId: new FormControl('', Validators.required),
  })

  get foodFormControll() {
    return this.foodForm.controls
  }

  ngOnInit() {
    this.getFood()
    this.getMenu()
  }

  onSubmit() {
    if (this.foodForm.invalid) {
      this.modalStatus = ""
      return
    }
    switch (this.dbops) {
      case DbOperation.create:
        console.log("called")
      console.log(DbOperation.create)
        this._foodService.addFoodData(<foodMasterModel>this.foodForm.value).subscribe(() => {
          this.getFood()
          this._toster.success("new record added in menu", 'Success')
          this.modalStatus = "modal"
        })
        break;

        case DbOperation.update:
          this._foodService.updateFoodData(<foodMasterModel>this.foodForm.value).subscribe(()=>{
            this.getFood()
            this._toster.success("record Updated",'Success')
            this.modalStatus = "modal"
          })
          break;

    }
  }

  getFood() { this._foodService.getFoodData().subscribe((res: any) => { this.foodList = res }) }
  getMenu(){this._menuService.getAllMenu().subscribe((res:any)=>{this.menuList = res})}

  edit(id: string) {
    this.dbops = DbOperation.update
    this.buttonText = "update"
    const updateFood = this.foodList.find((food: foodMasterModel) => food._id = id)
    if (updateFood) { this.foodForm.patchValue(updateFood) }
  }

  delete(id: string) {
    this._foodService.deleteFoodData(id)
  }

  onCancel() {
    this.foodForm.reset()
    this.buttonText = "save"
    this.submitted = false
  }




}
