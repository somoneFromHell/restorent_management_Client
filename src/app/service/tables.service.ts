import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { TableModel } from '../models/TableMaster';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private _http : HttpClient) { }

  uri = `${environment.apiURL}/table`

  oderurl = `${environment.apiURL}/table`

  getTableStatus(){
    return this._http.get(this.uri)
  }

  changeTableStatus(body:any){
    return this._http.patch(`http://localhost:3200/api/table/tableStatus/${body._id}`,body).subscribe(status => console.log(status))
  }

  getTableById(tableId:string){
    return this._http.get(`http://localhost:3200/api/table/${tableId}`)
  }

  deleteOrderByTableId(tableId:any){
    return this._http.delete(`http://localhost:3200/api/order/tableStatus/${tableId}`).subscribe(status => console.log(status))
  }

  
}
