export interface invoiceModel {
    _id: string,
    orderId: string,
    paymentMethod: string,
    paymentStatus: string,
    paymentDeueDate: Date,
    tableNumber: Number,
    totalAmount: Number,
    subTotal: Number,
    sGst: Number,
    cGst: Number,

}