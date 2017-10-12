import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class SocketApi{

  constructor(private socket:Socket){}
  // 获取所有的房间号
  public getRooms() {
    this.socket.emit("ngChat",{
      active:"getRooms"
    })
  }


}
