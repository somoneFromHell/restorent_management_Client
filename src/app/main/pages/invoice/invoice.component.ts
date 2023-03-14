import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { invoiceModel } from 'src/app/models/invoiceModel';
import { orderModel } from 'src/app/models/order';
import { orderItemModel } from 'src/app/models/OrderItemModel';
import { TableModel } from 'src/app/models/TableMaster';
import { InvoiceService } from 'src/app/service/invoice.service';
import { OrderService } from 'src/app/service/order.service';
import { TableMasterService } from 'src/app/service/table-master.service';
import { TablesService } from 'src/app/service/tables.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  constructor(private _route: ActivatedRoute,private _router: Router,private _tableService:TablesService,private _orderservice:OrderService,private _invoiceService:InvoiceService) {}

  orderItems:orderItemModel[] = []; 
  selectedTableId:string = ''
  subtotal:number = 0
  cGst:number = 0
  sGst:number = 0
  total:number = 0
  buttonText = "save invoice" 
  paymentMethod = "cash" 
  orderId=''
  tableNo = 0

  ngOnInit(){
    this._route.queryParams.subscribe(params => {this.selectedTableId = params['selectedTableId']});
    this.getOrderInfo()
    this._tableService.getTableById(this.selectedTableId).subscribe((res:any)=>{this.tableNo=res.tableNumber})
  }

  getOrderInfo(){
    this._orderservice.getOrderbyTableId(this.selectedTableId).subscribe((res:orderModel) => {
      this.orderItems = res.orderItems
      this.orderItems.forEach(orderItem => {
        this.subtotal += orderItem.unitPrice
      })
      this.cGst = (9*this.subtotal)/100 
      this.sGst = (9*this.subtotal)/100 
      this.total = this.sGst+this.cGst+this.subtotal
      this.orderId = res._id
    })
    
  }

  changebuttonText(text:string){
    this.buttonText=text
  }

  onClick(){

    this._invoiceService.saveInvoice({
      paymentMethod:this.paymentMethod,
      paymentDeueDate:new Date(),
      paymentStatus:"pending",
      orderId:this.orderId,
      tableNumber:this.tableNo,
      totalAmount:this.total,
      subTotal:this.subtotal,
      sGst:this.sGst,
      cGst:this.cGst,
    } ).subscribe(res =>{} )

    this._tableService.changeTableStatus({_id:this.selectedTableId})
    this._orderservice.changeOrderStatus(this.orderId).subscribe(res=>{})
    this._router.navigateByUrl('/tables')
  }
}