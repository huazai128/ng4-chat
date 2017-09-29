import { NgModule,ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports:[
    CommonModule
  ],
  declarations:[

  ],
  exports:[]
})

export class NgaModule{
  static forRoot():ModuleWithProviders{
    return <ModuleWithProviders> {
      ngModule:NgaModule,
      providers:[]
    }
  }
}
