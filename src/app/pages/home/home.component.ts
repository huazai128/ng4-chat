import { Component,ViewEncapsulation } from "@angular/core";
import { SocketApi } from "@core/socketApi";

@Component({
  selector:"page-home",
  templateUrl:"./home.html",
  styleUrls:["./home.scss"],
  encapsulation:ViewEncapsulation.None
})

export class HomeComponent{

  constructor(private socketApi:SocketApi){

  }

  ngOnInit(){

    this.socketApi.getRooms()
  }

}
