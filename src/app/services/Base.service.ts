import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import PSPDFKit from "pspdfkit";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpBase:HttpClient | undefined

  save='save';
  getAll='getAll';
  getById='getById/';
  getAllById='getAllById/'
  deleteById='deleteById/';
  baseURL='http://localhost:8040/';
  sweetDelete=false;
  header={
    headers:new HttpHeaders({

      'Content-Type':'multipart/form-data',
      'Authorization':'Token'
    })
  }
constructor(private http:HttpClient) {
  this.httpBase=http;
 }

 load(){
 }

 // @ts-ignore
  jwtTokenController():HttpHeaders{
   const token = sessionStorage.getItem("token");
   if ( token != null ) {
     const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
     return headers;
   }

 }




}
