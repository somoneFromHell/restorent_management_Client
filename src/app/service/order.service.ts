import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderModel } from '../models/order';
import { orderItemModel } from '../models/OrderItemModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  tblUrl = "http://localhost:3200/api/table" 
  orderUrl = "http://localhost:3200/api/order"

  getOrderbyTableId(tableId:string):Observable<orderModel>{
    return this._http.get<orderModel>(`http://localhost:3200/api/order/tableStatus/${tableId}`)
  }

  getTable(id:string){
    return this._http.get(`${this.tblUrl}/${id}`)
  } 

  addOrder(body:any){
    this._http.post(this.orderUrl,body).subscribe(status =>{})
  }
  
  changeOrderStatus(id:string){
    console.log('order status changed',id)
    return this._http.patch(`${this.orderUrl}/${id}`,"body")
    
  }

}
