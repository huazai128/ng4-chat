import { Component,ViewEncapsulation } from "@angular/core";
import { FormBuilder,AbstractControl,Validators,FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { EmailValidator } from "../register/validators";
import { LoginService } from "./login.servier";

@Component({
  selector:"page-login",
  templateUrl:"./login.html",
  styleUrls:["./login.scss"],
  encapsulation:ViewEncapsulation.None,
  providers:[LoginService]
})

export class LoginComponent{

  public loginForm:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;

  constructor(private _fb:FormBuilder,
              private _service:LoginService,
              private router:Router){
    this.loginForm = this._fb.group({
      "email":["",Validators.compose([Validators.required,EmailValidator.validate])],
      "password":["",Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])]
    });
    this.email = this.loginForm.controls["email"];
    this.password = this.loginForm.controls["password"];
  }

  public postLogin(value){
    if(this.loginForm.valid){
      this._service.login(this.loginForm.value).subscribe(({result}) => {
        if(result){
          localStorage.setItem("id_token",result.token);
          this.router.navigate(["/"]);
        }else{
          console.log('登录失败');
        }
      })
    }
  }
}
