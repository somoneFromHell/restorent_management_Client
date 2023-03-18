import { orderItemModel } from "./OrderItemModel";

export interface invoiceModel {
    orderItems:[orderItemModel]
    tableNumber: String,
    totalAmount: Number,
    subTotal: Number,
    sGst: Number,
    cGst: Number,

}