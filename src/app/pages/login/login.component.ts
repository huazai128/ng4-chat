import { Component,ViewEncapsulation } from "@angular/core";
import { FormBuilder,AbstractControl,Validators,FormGroup } from "@angular/forms";

@Component({
  selector:"page-login",
  templateUrl:"./login.html",
  styleUrls:["./login.scss"],
  encapsulation:ViewEncapsulation.None
})

export class LoginComponent{

  public loginForm:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  constructor(private _fb:FormBuilder){
    this.loginForm = this._fb.group({
      "username":["",Validators.compose([Validators.required])],
      "password":["",Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])]
    })

    this.username = this.loginForm.controls["username"];
    this.password = this.loginForm.controls["password"];
  }

  login(value){
    console.log(value)
  }


}
