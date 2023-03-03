import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  constructor(private route: ActivatedRoute, private _orderservice:OrderService) {
    
  }


  orderItems:any; 
  selectedTableId:string = ''

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.selectedTableId = params['selectedTableId']
    });
    this.getOrderInfo()
    console.log(this.orderItems)
  }

  getOrderInfo(){
    this._orderservice.getOrderbyTableId(this.selectedTableId).subscribe((res:any) => {this.orderItems = res.orderItems
})
  }
}
