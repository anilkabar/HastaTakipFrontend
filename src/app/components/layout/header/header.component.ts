import { Component, OnInit } from '@angular/core';
import {AutGuard} from "../../../aut.guard";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  user=JSON.parse(sessionStorage.getItem("user"));
  userName=this.user['sub'];

  constructor(
    private authGuard:AutGuard
  ) { }

  ngOnInit() {
  }




  logout(){
    this.authGuard.logout();
  }



}
