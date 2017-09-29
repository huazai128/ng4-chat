import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageModule } from "./pages/page.module";
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { HttpClientModule } from "@angular/common/http";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppService } from "./app.service"
import { AppComponent } from './app.component';
import { routing } from "./app.routing";

export function tokenGetter(): string { return localStorage.getItem('id_token'); }

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {jwt:localStorage.getItem('id_token')}};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization', // 标题名称
        authScheme:"Bearer",  // 授权方案
        tokenGetter : tokenGetter, // 获取令牌，并返回
        throwNoTokenError: false, // 是否抛出异常
        skipWhenExpired:false,  //
        whitelistedDomains: ['localhost:3000'] //只允许你身份验证的请求只能发送到您认可和信任的域
      }
    }),
    SocketIoModule.forRoot(config),
    PageModule,
    routing
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
