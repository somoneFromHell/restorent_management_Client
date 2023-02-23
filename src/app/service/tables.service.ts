import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private _http : HttpClient) { }

  url = 'http://localhost:3200/api/table'

  getTableStatus(){
    return this._http.get(this.url)
  }

}
