import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { TableModel } from '../models/TableMaster';
@Injectable({
  providedIn: 'root'
})
export class TableMasterService {

  uri = `${environment.apiURL}/table`


  constructor(private _http:HttpClient) { }

  getTables(){
    return this._http.get(this.uri)
  }

  addTable(data:TableModel){
    return this._http.post(this.uri,data)
  }

  updateTable(data:TableModel){
    return this._http.put(`${this.uri}/${data._id}`,data)
  }

  deletetable(id:string){
    return this._http.delete(`${this.uri}/${id}`)
  }


}
