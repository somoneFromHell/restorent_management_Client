import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  constructor(private _http:HttpClient) { }
  url = `${environment.apiURL}/orderitem`



  getOrderItem(tableId:string){
    return this._http.get(`${this.url}/${tableId}`)
  }

  addOrderItem(tableId:string,body:any){
    return this._http.post(`${this.url}/add/${tableId}`,body)
  }

  deleteOrderItem(tableId:string,orderItemId:string){
    return this._http.delete(`${this.url}/${tableId}/${orderItemId}`)
  }

  updateOrderItem(tableId:string,orderItemId:string,body:any){
    return this._http.put(`${this.url}/${tableId}/${orderItemId}`,body)
  }



}
