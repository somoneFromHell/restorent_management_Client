import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { FoodService } from 'src/app/service/food.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';

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
  imageSrc: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png'
  // image = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png';
  Imagepath: any = `${environment.apiURL}/foodImages`;
  
  file: any;

  foodForm = new FormGroup({
    _id: new FormControl(''),
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
    this.file = event.target.files[0];
    if (event.target.files && this.file) {
      const imagefile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(imagefile);

      this.foodForm.patchValue(
        { foodImage: this.file }
      )
    }
  }

  ImageUpload(img: File) {
    const formData = new FormData();
    if (this.foodForm.value) { }
    formData.append('file', img);
  }


  onSubmit() {
    if (this.foodForm.invalid) {
      this.modalStatus = ""
      return
    }


    switch (this.dbops) {

      case DbOperation.create:
        const formdata: any = new FormData();
        formdata.append('food', this.foodForm.get('food').value)
        formdata.append('description', this.foodForm.get('description').value)
        formdata.append('price', this.foodForm.get('price').value)
        formdata.append('foodImage', this.foodForm.get('foodImage').value)
        formdata.append('menuId', this.foodForm.get('menuId').value)

        this._foodService.addFoodData(formdata).subscribe(() => {
          this.getFood()
          this._toster.success("new food item added in menu", 'Success')
          this.modalStatus = "modal"
        })
        break;

      case DbOperation.update:
        const formdataForUpdate: any = new FormData();
        formdataForUpdate.append('_id', this.foodForm.get('_id').value)
        formdataForUpdate.append('food', this.foodForm.get('food').value)
        formdataForUpdate.append('description', this.foodForm.get('description').value)
        formdataForUpdate.append('price', this.foodForm.get('price').value)
        formdataForUpdate.append('foodImage', this.foodForm.get('foodImage').value)
        formdataForUpdate.append('menuId', this.foodForm.get('menuId').value)
        this._foodService.updateFoodData(formdataForUpdate,this.foodForm.value._id).subscribe(() => {
          this.getFood()
          this._toster.success("food item Updated", 'Success')
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

    if (updateFood) {
      this.foodForm.controls['_id'].setValue(updateFood._id),
        this.foodForm.controls['food'].setValue(updateFood.food),
        this.foodForm.controls['description'].setValue(updateFood.description),
        this.foodForm.controls['menuId'].setValue(updateFood.menuId),
        this.foodForm.controls['price'].setValue(updateFood.price)

      this.imageSrc = `${environment.apiURL}/foodImages/${updateFood.foodImage}`
    }

    this.selectedtext = id
    console.log(this.selectedtext)

  }

  delete(id: string) {
    Swal.fire({
      title: 'R u sure ??',
      text: 'u will not be able to recover data',
      icon: 'question',
      confirmButtonText: "yah..",
      denyButtonText: "nop",
      showCancelButton: true
    }).then((result => {
      if (result.value) {
        this._foodService.deleteFoodData(id).subscribe(res => {
          this.getFood();
          Swal.fire({
            title: 'success',
            text: 'food item removed successfully',
            icon: 'success'
          })
        })
      } else {
        Swal.fire({
          title: 'cancelled',
          text: 'your data is safe',
          icon: "error"
        })
      }
    }))
  }



  onCancel() {
    this.foodForm.reset()
    this.buttonText = "save"
    this.submitted = false
    this.imageSrc = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_960_720.png'
  }
}
