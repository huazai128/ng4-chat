import { Routes,RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import {HomeComponent } from "./home/home.component";

const routes:Routes = [
  { path:"page",
    component: PageComponent,
    children:[
      { path:"",redirectTo:"home",pathMatch:"full" },

      { path:"home",component:HomeComponent }
    ]
  },
  { path:"login",component:LoginComponent },
  { path:"register",component:RegisterComponent },
]

export const routing = RouterModule.forChild(routes);
