import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "./app.service";
import { NotificationsService } from 'angular2-notifications';
import "rxjs/add/operator/distinct";
import "rxjs/add/operator/concatAll";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  template: `
    <simple-notifications [options]="notificationsOptions"></simple-notifications>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  providers:[NotificationsService,AppService]
})
export class AppComponent {

  public optionIsInited: boolean = false;

  constructor(private _router:Router,
              private appService:AppService,
              private _notifications:NotificationsService){
    // 路由拦截
    this._router.events.map(() => {
        return Observable.of(this._router.url);
      })
      .concatAll()
      .distinct()
      .subscribe((url) => {
        if(!Object.is(url,'/') && !Object.is(url,"/login")  && !Object.is(url,"/register")){
          console.log("=====");
          this.routerCheck(url);
        }
    })
  }
  // 通知配置
  public notificationsOptions = {
    position: ['top', 'right'],
    timeOut: 1000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 5,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: false
  };

  ngOnInit(){
    this.routerCheck();
  }

  // 路由检测
  private routerCheck(url:string=""):void{
    console.log(this.appService.tokenNotExpired());
    if(!this.appService.tokenNotExpired()){
      setTimeout(() => {
        this._notifications.error('长的太丑了，不见！！！', '...', { timeOut: 1000 });
        if(Object.is(url, "/register")){
          this._router.navigate(["/register"])
        }else{
          this._router.navigate(["/login"])
        }
      },0)
    }else if(!this.optionIsInited){
      this._router.navigate(["/"])
      this.optionIsInited = true;
    }
  }
}
