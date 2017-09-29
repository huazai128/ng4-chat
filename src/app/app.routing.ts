import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

const routes:Routes = [
  { path:"",redirectTo:"page",pathMatch:"full" },
  { path:"**",redirectTo:"page"}
]

export const routing:ModuleWithProviders = RouterModule.forRoot(routes);
