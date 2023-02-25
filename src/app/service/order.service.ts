import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderModel } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  tblUrl = "http://localhost:3200/api/table" 
  orderUrl = "http://localhost:3200/api/order"

  getTable(id:string){
    return this._http.get(`${this.tblUrl}/${id}`)
  } 

  addOrder(data:orderModel){
    return this._http.post(this.orderUrl,data)
  }
}
