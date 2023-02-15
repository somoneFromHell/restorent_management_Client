import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { foodMasterModel } from '../models/FoodMaster';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _http:HttpClient) { }

  url = "http://localhost:3200/api/food"
  getFoodData(){
    return this._http.get(this.url)
  }

  addFoodData(data:foodMasterModel){
    return this._http.post(this.url,data)
  }

  updateFoodData(body:foodMasterModel){
   return this._http.put(`${this.url}/${body._id}`,body)
  }

  deleteFoodData(id:string){
    return this._http.delete(`${this.url}/${id}`)
  }
}
