import { NgModule,ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "./guard/guard.service";
import { SocketApi } from "./socketApi";

const CORE_SERVICE = [
  AuthGuard,
  SocketApi
]

@NgModule({
  imports:[
    CommonModule
  ],
  declarations:[

  ],
  exports:[

  ]
})

export class CoreModule{
  static forRoot():ModuleWithProviders{
    return <ModuleWithProviders> {
      ngModule:CoreModule,
      providers:[
        ...CORE_SERVICE
      ]
    }
  }
}
