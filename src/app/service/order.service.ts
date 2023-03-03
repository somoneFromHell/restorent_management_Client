import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderModel } from '../models/order';
import { orderItemModel } from '../models/OrderItemModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  tblUrl = "http://localhost:3200/api/table" 
  orderUrl = "http://localhost:3200/api/order"

  getOrderbyTableId(tableId:string){
    return this._http.get(`http://localhost:3200/api/order/tableStatus/${tableId}`)
  }

  getTable(id:string){
    return this._http.get(`${this.tblUrl}/${id}`)
  } 

  addOrder(body:any){
    console.log(body)
    this._http.post(this.orderUrl,body).subscribe(status => console.log(status))
  }


}
