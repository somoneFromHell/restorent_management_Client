export interface UserModel {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: {_id:string,roleName:string,routs:Array<any>};
    token?: string;
}

export interface RoutsRightsModel{
    rights:{POST:boolean,PUT:boolean,DELETE:boolean,GET:boolean}
}