import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpParams,HttpErrorResponse  } from "@angular/common/http";
import { NotificationsService } from "angular2-notifications"
import { API_ROOT } from "@config";
import { AppService } from "@app/app.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";

@Injectable()
export class RegisterService{

  constructor(private httpClient:HttpClient,
              private appService:AppService,
              private _notifications:NotificationsService){
  }

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

  // 注册
  public registerUser(data):Observable<any>{
    // {observe: 'response'}
    return this.httpClient.post(`${API_ROOT}/sign`,data)
      .switchMap(this.handleResponse)
      .retry(3)
      .catch(this.handleError)
  }

  // 检查email是否注册
  public checkEmail(email):Observable<any>{
    return this.httpClient.get(`${API_ROOT}/auth`,{params:new HttpParams().set('email', email),observe:"body"})
      .debounceTime(300)
      .switchMap(this.handleResponse)
      .retry(3)
      .catch(this.handleError)
  }

  //
  public loggedIn(){
    return this.appService.tokenNotExpired();
  }
}
