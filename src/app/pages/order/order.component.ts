import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { foodMasterModel } from 'src/app/models/FoodMaster';
import { menuMasterModel } from 'src/app/models/menuMaster';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { TableModel } from 'src/app/models/TableMaster';
import { FoodService } from 'src/app/service/food.service';
import { MenuMasterService } from 'src/app/service/menu-master.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor(private route: ActivatedRoute, private _foodService: FoodService, private _menuService: MenuMasterService, private _orderService: OrderService) { }

  table!: TableModel;
  buttonText = 'add';
  menuList: menuMasterModel[] = []
  foodList: foodMasterModel[] = []
  orderItems: orderItemModel[] = []



  ngOnInit() {
    this.tableStatus()
    this.createOrder()
    this.getMenu()
  }

  orderItemForm = new FormGroup({
    foodId:new FormControl('',Validators.required),
    quantity:new FormControl(0,Validators.required),
    unitPrice: new FormControl(0),
    orderId: new FormControl(''),
    foodName : new FormControl('')
  })


// < stert from herre
  onSubmit() {
    if(this.orderItemForm.value.foodId){
      const selectedFood = this._foodService.getFoodById(this.orderItemForm.value.foodId)
      this.orderItemForm.value.unitPrice = this.orderItemForm.value.quantity  
    }

   }
  getMenu() { this._menuService.getAllMenu().subscribe((res: any) => { this.menuList = res }) }
  
  menuSelected(mId: string) {
    this._foodService.getFoodByMenu(mId).subscribe((res: any) => {
      this.foodList = res
    })}

    createOrder(){
      const now = new Date();

      // this._orderService.addOrder({
      //   _id:'',
      //   orderDate:now.getTime,
      //   TableId:'',
      //   reserveTime:now.getDate
      // })
    }

    tableStatus(){
          const id = this.route.snapshot.queryParamMap.get('id');
    console.log(id)
    console.log('colled')
    if (id)
      this._orderService.getTable(id).subscribe((res: any) => {
        this.table = res
      })
    }

  edit(id: string) { }
  delete(id: string) { }

}


