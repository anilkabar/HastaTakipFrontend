import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  url:any

  constructor(private router:Router) {

    this.router.events.subscribe(event=>{
      if (event instanceof NavigationStart){
        //console.log(event.url)
        if (event.url=='/admin/auth' ||event.url=='/admin' ||event.url=='/Permission'){
          this.url=true;
        }
        else {
          //console.log("deneme"+this.url)
          this.url=false;
        }
      }
    })
  }

  title = 'test4';
}
