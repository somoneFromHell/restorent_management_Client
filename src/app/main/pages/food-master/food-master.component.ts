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

  constructor(private _foodService: FoodService, private _menuService: MenuMasterService, private _toster: ToastrService) { }

  dbops = DbOperation.create
  submitted = false
  buttonText = "save"
  modalStatus = "modal"
  foodList: foodMasterModel[] = []
  menuList: menuMasterModel[] = []
  selectedtext: string = "";
  imageSrc:string|ArrayBuffer|null = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png'
  // image = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png';
  file: any;

  foodForm = new FormGroup({
    _id: new FormControl(),
    food: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, Validators.required),
    foodImage: new FormControl(),
    menuId: new FormControl('', Validators.required),

  })

  get foodFormControll() {
    return this.foodForm.controls
  }

  ngOnInit() {
    this.getFood()
    this.getMenu()
  }

  onFileSelected(event: any) {
    console.log(this.foodForm.value)
    this.file = event.target.files[0];
    if (event.target.files && this.file){
      const imagefile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(imagefile);

      this.foodForm.patchValue(
        {foodImage:this.file}
      )
      console.log(this.foodForm.value)
  }}

  ImageUpload(img:File){
    const formData = new FormData();
    if(this.foodForm.value){}
    formData.append('file', img);
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
          console.log(this.foodForm.value)
          this.getFood()
          this._toster.success("new record added in menu", 'Success')
          this.modalStatus = "modal"
        })
        break;

      case DbOperation.update:
        console.log(this.foodForm.value)
        this._foodService.updateFoodData(<foodMasterModel>this.foodForm.value).subscribe(() => {
          this.getFood()
          this._toster.success("record Updated", 'Success')
          this.modalStatus = "modal"
        })
        break;

    }
    this.onCancel()
  }

  getFood() { this._foodService.getFoodData().subscribe((res: any) => { this.foodList = res }) }
  getMenu() { this._menuService.getAllMenu().subscribe((res: any) => { this.menuList = res }) }

  edit(id: string) {
    console.log(id)
    this.onCancel()
    this.dbops = DbOperation.update
    this.buttonText = "update"
    const updateFood = this.foodList.find((food: foodMasterModel) => food._id === id)

    

    if (updateFood) 
    { 
      this.foodForm.controls['food'].setValue(updateFood.food),
      this.foodForm.controls['description'].setValue(updateFood.description),
      this.foodForm.controls['menuId'].setValue(updateFood.menuId),
      this.foodForm.controls['price'].setValue(updateFood.price)
      
      this.imageSrc = `http://localhost:3200/foodImages/${updateFood.foodImage}`
    }

    this.selectedtext = id
    console.log(this.selectedtext)

  }

  delete(id: string) {
    this._foodService.deleteFoodData(id)
    console.log(id)

    this.getFood()
  }

  onCancel() {
    this.foodForm.reset()
    this.buttonText = "save"
    this.submitted = false

    this.imageSrc ='https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png'
  }
}
