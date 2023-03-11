export interface UserModel {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    pages:[pageModel]
}


export interface pageModel{navItem:boolean,pageName:string,pageRoute:string}
