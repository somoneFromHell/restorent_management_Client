export interface UserModel {
    _id:String
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate:Date;
    address:string;
    profileImage:string;
    gender:string
    pages:[pageModel];
    role:string
}


export interface pageModel{navItem:boolean,pageName:string,pageRoute:string,icon:string}
