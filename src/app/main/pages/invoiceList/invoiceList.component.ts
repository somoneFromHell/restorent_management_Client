import { Component } from "@angular/core";
import { invoiceModel } from "src/app/models/invoiceModel";
import { InvoiceService } from "src/app/service/invoice.service";

@Component({

    selector: 'app-invoice-list',
    templateUrl: './inoviceList.component.html'
})

export class invoiceListComponent {
showInfo(arg0: string) {
throw new Error('Method not implemented.');
}
    invoiceList: invoiceModel[];
    constructor(private _invoiceServices:InvoiceService){}

    ngOnInit(){
        this._invoiceServices.getAllinvoice().subscribe((res:any)=>{
            this.invoiceList = res
        })
    }


}