import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AppService{

  constructor(private jwtHelper:JwtHelperService){}

  public tokenNotExpired():boolean{

    const token:string =  localStorage.getItem('id_token');

    return token != null && this.jwtHelper.isTokenExpired(token);
  }
}
