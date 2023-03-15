import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { invoiceModel } from "../models/invoiceModel";

@Injectable({
    providedIn:"root"
})

export class InvoiceService {

    constructor(private _http:HttpClient){}

    url = `${environment.apiURL}/invoice`



    saveInvoice(body:invoiceModel){
        
        return this._http.post(this.url,body)
      }

      getAllinvoice(){
        return this._http.get(this.url)
      }

    
}