import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  tblUrl = "http://localhost:3200/api/table" 

  getTable(id:string){
    return this._http.get(`${this.tblUrl}/${id}`)
  } 
}
