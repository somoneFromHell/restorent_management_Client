import { Component } from "@angular/core";
import { invoiceModel } from "src/app/models/invoiceModel";
import { FoodService } from "src/app/service/food.service";
import { InvoiceService } from "src/app/service/invoice.service";

@Component({

    selector: 'app-invoice-list',
    templateUrl: './inoviceList.component.html'
})

export class invoiceListComponent {
    
    invoiceList: Array<invoiceModel>;
    invoiceDetail:invoiceModel = {orderItems:[{quantity:0,unitPrice:0,foodName:'',menuId:'',foodId:''}],tableNumber: '',totalAmount: 0,subTotal: 0,sGst: 0,cGst: 0,};
    constructor(private _invoiceServices:InvoiceService,private _foodServices:FoodService){}
    
    ngOnInit(){
        this._invoiceServices.getAllinvoice().subscribe((res:any)=>{
            this.invoiceList = res
            console.log(res)
        })
    }
    
    showInfo(invoiceId:string) {
        this._invoiceServices.getInvoicebyId(invoiceId).subscribe((res:any)=>{
            this.invoiceDetail = res.Data
            console.log(res)
        })
       
    }


}