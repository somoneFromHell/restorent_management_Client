import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { menuMasterModel } from '../models/menuMaster';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {

  constructor(private _http:HttpClient) { }

  url = `${environment.apiURL}/menu`
  getAllMenu(){
    console.log(this.url)
    return this._http.get(this.url)
  }

  getMenuById(id:string){
    return this._http.get(`${this.url}/${id}`)
  }

  createMenu(body:menuMasterModel){
    return this._http.post(this.url,body);
  }

  updateMenu(body:menuMasterModel){
    return this._http.put(`${this.url}/${body._id}`,body)
  }

  deleteMenu(id:string){
    return this._http.delete(`${this.url}/${id}`)
  }
}
