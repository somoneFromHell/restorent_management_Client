import { orderItemModel } from "./OrderItemModel";

export interface invoiceModel {
    _id?:string,
    orderItems:[orderItemModel]
    tableNumber: String,
    totalAmount: Number,
    subTotal: Number,
    sGst: Number,
    cGst: Number,
    createdAt?:Date

}