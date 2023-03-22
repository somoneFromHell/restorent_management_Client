import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { responseModel } from 'src/app/models/responseModel';
import { FoodService } from 'src/app/service/food.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';


@Component({
  selector: 'app-order-and-invoice',
  templateUrl: './order-and-invoice.component.html',
  styleUrls: ['./order-and-invoice.component.css']
})
export class OrderAndInvoiceComponent implements OnChanges, OnInit {

  sGst: number;
  cGst: number;
  
  
  
  constructor(private _menuService: MenuMasterService, private _foodServices: FoodService, private _Tostr: ToastrService,private _invoiceServies:InvoiceService) { }
  
  @Input() item = '';
  @Input() tableId = '';
  @Output() updateTableList = new EventEmitter();
  
  total: number;
  orderItems: any = [];
  Oitem: orderItemModel;
  menuList: menuMasterModel[] = [];
  foodList: foodMasterModel[] = [];
  showCreateForm: boolean = false;
  selectedForDeleteList: number[] = [];
  showDeleteButton = true;
  addInputForedit = false;
  showInvoice = false
  currentOrderTotal = 0


  ngOnInit() {
    this.resetForm()

    this._menuService.getAllMenu().subscribe((res: any) => { this.menuList = res })
  }


  ngOnChanges(changes: SimpleChanges) {
    this.orderItems = []
    if (localStorage.getItem(changes['tableId'].currentValue)) {
      this.orderItems = JSON.parse(localStorage.getItem(changes['tableId'].currentValue)).orderItems

      this.selectedForDeleteList = []
    }
  }

  resetForm(){
    this.orderItemForm.controls.menuId.patchValue("selectMenu") 
    this.orderItemForm.controls.foodId.patchValue("selectFood") 
    this.orderItemForm.controls.quantity.patchValue(1) 
  }
  
  orderItemForm = new FormGroup({
    menuId: new FormControl('', [Validators.required]),
    foodId: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.max(10), Validators.min(1)])
  })
  
  inlineEditForm = new FormGroup({
    inlineEdit: new FormControl(1,)
  })

  NoGuestForm = new FormGroup({
    NoOfGuests: new FormControl(1)
  })

  addorderItem() {
    var verificationList: any = []
    this.orderItems.forEach((element: any) => {
      verificationList.push(element.food)
    });
    if (verificationList.includes(this.orderItemForm.value.foodId)) {
      this._Tostr.error("error", "food item alrady exist")
    }
    else {

      this._foodServices.getFoodById(this.orderItemForm.value.foodId).subscribe((element: any) => {
        this.orderItems.push(this.orderItemForm.value)

        this.orderItems[this.orderItems.length - 1].foodName = element.food
        this.orderItems[this.orderItems.length - 1].price = element.price
        this.orderItems[this.orderItems.length - 1].unitTotal = element.price * this.orderItemForm.value.quantity

        const order = { orderItems: this.orderItems };
      localStorage.setItem(this.tableId, JSON.stringify(order))
      this.resetForm()
      this.updateTableList.emit()
      })
      
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
    this.selectedForDeleteList.includes(arg0) ? this.selectedForDeleteList.splice(num, 1) : this.selectedForDeleteList.push(arg0)
  }

  delete() {
    this.orderItems.forEach((element: any) => {
      if (this.selectedForDeleteList.includes(this.orderItems.indexOf(element))) {
        this.orderItems.splice(this.orderItems.indexOf(element), 1)
        this.selectedForDeleteList = [];

      }
    });
    const order = { orderItems: this.orderItems };

    localStorage.removeItem(this.tableId)
    localStorage.setItem(this.tableId, JSON.stringify(order))
  }

  oninlineSubmit(contactForm: any) {
  }


  forEdit(index: any) {
    this.orderItems.forEach((res: any) => res.isEdit = false)
    this.inlineEditForm.controls.inlineEdit.patchValue(this.orderItems[index].quantity)
    this.orderItems[index].isEdit = true

  }

  updateQuntity(index: any) {
    this.orderItems[index].quantity = this.inlineEditForm.value.inlineEdit
    const order = { orderItems: this.orderItems };
    this.abortInlineEdit()
    localStorage.removeItem(this.tableId)
    localStorage.setItem(this.tableId, JSON.stringify(order))
  }


  abortInlineEdit() {
    this.orderItems.forEach((res: any) => res.isEdit = false)

  }

  shiftPages() {
    this.showInvoice = !this.showInvoice
    this.currentOrderTotal = 0
    this.orderItems.forEach((element: any) => {
      this.currentOrderTotal = this.currentOrderTotal += element.unitTotal
    });
    this.total = this.currentOrderTotal+(this.currentOrderTotal/100)*18.6
    this.sGst = (this.currentOrderTotal/100)*9.3
    this.cGst = (this.currentOrderTotal/100)*9.3
  }

  saveInvoice() {
    const Finalinvoice = {tableNumber:this.item,orderItems:this.orderItems,totalAmount:this.total,subTotal:this.currentOrderTotal,cGst:this.cGst,sGst:this.sGst}
    this._invoiceServies.saveInvoice(Finalinvoice).subscribe((res:any)=>{
      console.log(res.Message,res.Success)
      res.Success ? this._Tostr.success("success",res.Message):this._Tostr.error("FAIL",'somthing went wrong')
      this. cancellOrder()
    })

    console.log(Finalinvoice)
    }


    cancellOrder() {
      this.orderItems = []
      localStorage.removeItem(this.tableId)
      this.updateTableList.emit()
      }


}
