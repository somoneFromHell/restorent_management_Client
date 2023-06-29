import { Component } from "@angular/core";
import { invoiceModel } from "src/app/models/invoiceModel";
import { FoodService } from "src/app/service/food.service";
import { InvoiceService } from "src/app/service/invoice.service";
import { MatTableModule,MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'app-invoice-list',
    templateUrl: './inoviceList.component.html'
})

export class invoiceListComponent {
    
    invoiceList: Array<invoiceModel>;
    constructor(private _invoiceServices:InvoiceService,private _foodServices:FoodService){}
    
    ngOnInit(){
        this._invoiceServices.getAllinvoice().subscribe((res:any)=>{
            this.invoiceList = res
            console.log(res)
        })
    }
    
   
       
    }


