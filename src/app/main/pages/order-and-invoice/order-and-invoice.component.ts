import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { FoodService } from 'src/app/service/food.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';


@Component({
  selector: 'app-order-and-invoice',
  templateUrl: './order-and-invoice.component.html',
  styleUrls: ['./order-and-invoice.component.css']
})
export class OrderAndInvoiceComponent implements OnChanges, OnInit {

  
  edit(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _menuService: MenuMasterService, private _foodServices: FoodService, private _Tostr: ToastrService) { }

  @Input() item = '';
  @Input() tableId = '';

  orderItems: any = [];
  Oitem: orderItemModel;
  menuList: menuMasterModel[] = [];
  foodList: foodMasterModel[] = [];
  showCreateForm: boolean = false;
  selectedForDeleteList:number[] = [];
  showDeleteButton = true;
  addInputForedit = false;


  ngOnInit() {
    this._menuService.getAllMenu().subscribe((res: any) => { this.menuList = res })
  }


  ngOnChanges(changes: SimpleChanges) {
    this.orderItems = []
    if (localStorage.getItem(changes['tableId'].currentValue)) {
      this.orderItems = JSON.parse(localStorage.getItem(changes['tableId'].currentValue)).orderItems
      this.orderItemForm.reset()
      this.selectedForDeleteList = []
    }
    console.log(this.selectedForDeleteList)
  }


  orderItemForm = new FormGroup({
    menuId: new FormControl('', [Validators.required]),
    food: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.max(10), Validators.min(1)])
  })

  addClick() {
    this.showCreateForm = !this.showCreateForm
  }

  addorderItem() {
    var verificationList: any = []
    this.orderItems.forEach((element: any) => {
      verificationList.push(element.food)
    });
    if (verificationList.includes(this.orderItemForm.value.food)) {
      this.orderItems.push(this.orderItemForm.value)
      const order = { orderItems: this.orderItems };
      localStorage.setItem(this.tableId, JSON.stringify(order))
    }
    else {
      this._Tostr.error("error", "food item alrady exist")
    }
    this.showCreateForm = !this.showCreateForm
  }


  menuSelected(mId: string) {
    this._foodServices.getFoodByMenu(mId).subscribe((res: any) => {
      this.foodList = res
    })
  }


  selectForDelete(arg0: any) {
    this.showDeleteButton = false
    let num = this.selectedForDeleteList.indexOf(arg0)
    console.log(num)
    this.selectedForDeleteList.includes(arg0) ? this.selectedForDeleteList.splice(num,1) : this.selectedForDeleteList.push(arg0)
    }

    delete() {
     this.orderItems.forEach((element:any) => {
        if(this.selectedForDeleteList.includes(this.orderItems.indexOf(element))){
          this.orderItems.splice(this.orderItems.indexOf(element),1)
        }
     });
    }

}
