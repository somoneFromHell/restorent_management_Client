import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { TableModel } from 'src/app/models/TableMaster';
import { FoodService } from 'src/app/service/food.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';
import { TablesService } from 'src/app/service/tables.service';
import { Router } from '@angular/router';
import { OrderItemsService } from 'src/app/service/order-items.service';
import { DbOperation } from 'src/app/helpers/dbOperations';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor(private route: ActivatedRoute, private router: Router, private _foodService: FoodService, private _tableService: TablesService, private _menuService: MenuMasterService, private _orderItemService: OrderItemsService, private _tosetrService: ToastrService) { }

  table!: TableModel;
  buttonText = 'add';
  dbOps: DbOperation = DbOperation.create;
  menuList: menuMasterModel[] = []
  foodList: foodMasterModel[] = []
  orderItems: orderItemModel[] = []
  selectedTableId: any = ''
  // menuId = ''


  ngOnInit() {
    this.getMenu()
    this.route.queryParams.subscribe(params => {
      this.selectedTableId = params['TableId']
    });
    console.log(this.selectedTableId)
    this.getOrderItems(this.selectedTableId)

  }

  orderItemForm = new FormGroup({
    menuId: new FormControl('',Validators.required),
    foodId: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required),
    orderId: new FormControl(''),
  })


  // < stert from herre
  onSubmit() {
    this.cancell()

    this._orderItemService.addOrderItem(this.selectedTableId, this.orderItemForm.value).subscribe(() => {
    this.getOrderItems(this.selectedTableId)
    this._tosetrService.success('data added', "success")


    })
  }

  getMenu() { this._menuService.getAllMenu().subscribe((res: any) => { this.menuList = res }) }
  getOrderItems(menuId: string) { this._orderItemService.getOrderItem(menuId).subscribe((res: any) => { this.orderItems = res }) }

  menuSelected(mId: string) {
    this._foodService.getFoodByMenu(mId).subscribe((res: any) => {
      this.foodList = res
    })
  }

  cancellOrder() {

    console.log(this.selectedTableId)
    this._tableService.deleteOrderByTableId(this.selectedTableId)
    this._tableService.patchTable({ _id: this.selectedTableId })
    this.router.navigateByUrl('/tables');
  }

  cancell() {
    this.buttonText = 'add';
    this.dbOps = DbOperation.create;
    this.orderItemForm.reset();

  }
  edit(id: string) {
    this.cancell()
    this.buttonText = 'update';
    this.dbOps = DbOperation.update;
    const updateOrderItem = this.orderItems.find((item: orderItemModel) => item._id === id)

    console.log(updateOrderItem)
    if (updateOrderItem) {
        this.orderItemForm.controls['menuId'].setValue(updateOrderItem.menuId)
        this.orderItemForm.controls['foodId'].setValue(updateOrderItem.foodId)
        this.orderItemForm.controls['quantity'].setValue(updateOrderItem.quantity)
    }
  }

  modealcalled(){
    this.cancell()
  }

  genrateInvoice(){
    
  }

  delete(id: string) {
    Swal.fire({
      title: 'R u sure ??',
      text: 'remove this item from the order',
      icon: 'question',
      confirmButtonText: "yah..",
      denyButtonText: "nop",
      showCancelButton: true
    }).then((result => {
      if (result.value) {
        this._orderItemService.deleteOrderItem(this.selectedTableId, id).subscribe(res => {
          this.getOrderItems(this.selectedTableId)
          Swal.fire({
            title: 'success',
            text: 'item removed',
            icon: 'success'
          })
        })
      } else {
        Swal.fire({
          title: 'cancelled',
          text: 'wtf y the hell you chose that in the first place',
          icon: "error"
        })
      }
    }))
  }

}


