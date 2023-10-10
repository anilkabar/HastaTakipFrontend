import {BaseModel} from "./BaseModel";

export interface UserModel {
status:boolean;
message:string;
data:UserModelData[]
}
export interface UserModelItem {
  status: boolean;
  message: string;
  data: UserModelData;
}
export class UserModelData extends BaseModel{
  username?:string;
  isActive?:boolean;
  nameandsurname?:string


}
