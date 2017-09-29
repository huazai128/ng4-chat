import { Component,EventEmitter,ViewChild,ElementRef } from "@angular/core";

@Component({
  selector:"page-mess",
  templateUrl:"./messaging.html",
  styleUrls:["./messaging.scss"]
})

export class MessagingComponent{

  @ViewChild("scrollMe") public scrollMe:ElementRef;

  public draftMessageText:string;
  public textChanged = new EventEmitter<any>();
  public lostFocus = new EventEmitter<any>();

  constructor(){}

  onEnter(){

  }
}
