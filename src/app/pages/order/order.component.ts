import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableModel } from 'src/app/models/TableMaster';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor( private route:ActivatedRoute,private _orderService:OrderService) {}

  table!:TableModel;
  buttonText = 'add';


  orderItemForm = new FormGroup({
    quntity:new FormControl(''),
    FoodId:new FormControl('')

  })


  ngOnInit(){

  const id = this.route.snapshot.queryParamMap.get('id');
    console.log(id)
    console.log('colled')
    if(id)
    this._orderService.getTable(id).subscribe((res:any)=>{
      this.table = res
    })
  }

  onSubmit(){}

}


