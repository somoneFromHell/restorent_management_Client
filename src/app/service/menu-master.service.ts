import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { menuMasterModel } from '../models/menuMaster';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {

  constructor(private _http:HttpClient) { }

  url = "http://localhost:3200/api/menu"

  getAllMenu(){
    return this._http.get(this.url)
  }

  createMenu(body:menuMasterModel){
    return this._http.post(this.url,body)
  }

  updateMenu(body:menuMasterModel){
    return this._http.put(`${this.url}/${body._id}`,body)
  }

  deleteMenu(id:string){
    return this._http.delete(`${this.url}/${id}`)
  }
}
