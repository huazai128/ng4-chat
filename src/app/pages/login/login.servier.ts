import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { NotificationsService } from "angular2-notifications";
import { Observable } from "rxjs/Observable";
import { API_ROOT } from "@config";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import { AppService }  from "../../app.service";

@Injectable()
export class LoginService{

  private appUrl = `${API_ROOT}/auth`;

  constructor(private httpClient:HttpClient,
              private _notifications:NotificationsService,
              private appService:AppService){}

  // 获取数据成功
  private handleResponse = (res:any):Observable<any> => {
    if(res.code){
      this._notifications.success("提示",res.message);
      return Observable.of(res);
    }else{
      this._notifications.error("注册错误",res.debug ? res.debug.message : res.message);
      return Observable.of(res);
    }
  }

  // 请求失败
  private handleError = (err:HttpErrorResponse):Observable<any> => {
    console.log(err);
    if (err.error instanceof Error) {
      this._notifications.error("请求失败",err.error.message);
      console.log('An error occurred:', err.error.message);
    } else {
      this._notifications.error("请求失败",`Backend returned code ${err.status}, body was: ${err.error}`);
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
    return Observable.of(err);
  }

  public login(data){
    console.log(data);
    return this.httpClient.post(this.appUrl,data)
      .switchMap(this.handleResponse)
      .retry(3)
      .catch(this.handleError)
  }

  //
  public loggedIn(){
    return this.appService.tokenNotExpired();
  }
}
