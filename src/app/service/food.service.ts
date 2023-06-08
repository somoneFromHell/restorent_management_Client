import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { foodMasterModel } from '../models/FoodMaster';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _http:HttpClient) { }

  url = `${environment.apiURL}/food`


  getFoodData(){
    return this._http.get(this.url)
  }

  getFoodById(id:string){
    return this._http.get(`${this.url}/${id}`)
  }

  getFoodByMenu(mId:string){
    return this._http.get(`${this.url}/bymenu/${mId}`)
  }

  addFoodData(data:foodMasterModel){
    return this._http.post(this.url,data)
  }

  updateFoodData(body:foodMasterModel,id:string){
    console.log(body)
   return this._http.put(`${this.url}/${id}`,body)
  }

  deleteFoodData(id:string){
    return this._http.delete(`${this.url}/${id}`)
  }



}
