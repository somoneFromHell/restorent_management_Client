import { Component } from "@angular/core";
import { invoiceModel } from "src/app/models/invoiceModel";
import { InvoiceService } from "src/app/service/invoice.service";

@Component({

    selector: 'app-invoice-list',
    templateUrl: './inoviceList.component.html'
})

export class invoiceListComponent {
    
    invoiceList: invoiceModel[];
    invoiceDetail:invoiceModel;
    constructor(private _invoiceServices:InvoiceService){}
    
    ngOnInit(){
        this._invoiceServices.getAllinvoice().subscribe((res:any)=>{
            this.invoiceList = res
            console.log(res)
        })
    }
    
    showInfo(invoiceId:string) {
        this._invoiceServices.getInvoicebyId(invoiceId).subscribe((res:any)=>{
            this.invoiceDetail = res
        })
    }


}