import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableModel } from '../models/TableMaster';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private _http : HttpClient) { }

  url = 'http://localhost:3200/api/table'
  oderurl = 'http://localhost:3200/api/order'

  getTableStatus(){
    return this._http.get(this.url)
  }

  changeTableStatus(body:any){
    return this._http.patch(`http://localhost:3200/api/table/tableStatus/${body._id}`,body).subscribe(status => console.log(status))
  }

  deleteOrderByTableId(tableId:any){
    return this._http.delete(`http://localhost:3200/api/order/tableStatus/${tableId}`).subscribe(status => console.log(status))
  }

  
}
