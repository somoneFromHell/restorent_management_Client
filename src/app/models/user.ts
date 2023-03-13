export interface UserModel {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    pages:[pageModel];
    role:string
}


export interface pageModel{navItem:boolean,pageName:string,pageRoute:string}
