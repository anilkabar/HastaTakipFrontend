export interface CityModel {
  status:boolean;
  message:string;
  data:CityData[];
}

export interface CityItem {
  status:boolean;
  message:string;
  data:CityData;
}
export interface CityData{
  id?:number;
  name:string;
}


