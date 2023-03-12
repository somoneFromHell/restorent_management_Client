import { orderItemModel } from "./OrderItemModel";

export interface orderModel{
    _id:string,
    orderDate:Date,
    TableId:String,
    orderItems:Array<orderItemModel>
}