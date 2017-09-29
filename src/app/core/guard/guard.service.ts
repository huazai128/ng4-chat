import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivateChild } from "@angular/router";
import { AppService } from "@app/app.service";

@Injectable()
export class AuthGuard implements CanActivate ,CanActivateChild{
  constructor(private appService: AppService, private router: Router){}
  // 路由守卫
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    let url:string = state.url;
    return
  }
  // 子路由守卫
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // 检查是否登录
  checkLogin(url: string): boolean {
    if (this.appService.tokenNotExpired) { return true; }
    this.router.navigate(['/login']);
    return false;
  }

}
