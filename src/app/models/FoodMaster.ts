import { menuMasterModel } from "./menuMaster"

export interface foodMasterModel {
    _id:string,
    food:string,
    price:number,
    foodImage:File,
    menuId:string,
    description:string,
    menuName:menuMasterModel[]
}