import { orderItemModel } from "./OrderItemModel";

export interface invoiceModel {
    _id?:string,
    orderItems:[orderItemModel]
    tableNumber: string,
    totalAmount: number,
    subTotal: number,
    sGst: number,
    cGst: number,
    createdAt?:Date

}