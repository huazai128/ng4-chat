import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { PageComponent } from "./page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { MessagingComponent } from "./messaging/messaging.component";
import { ChildComponent } from "./messaging/component/child.component";

import { routing } from "./page.routing"

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations:[
    PageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MessagingComponent,
    ChildComponent,
  ],
  providers:[

  ]
})

export  class PageModule{

}
