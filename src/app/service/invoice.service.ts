import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { invoiceModel } from "../models/invoiceModel";

@Injectable({
    providedIn:"root"
})

export class InvoiceService {

    constructor(private _http:HttpClient){}

    url = 'http://localhost:3200/api/invoice'



    saveInvoice(body:invoiceModel){
        
        return this._http.post(this.url,body)
      }
}