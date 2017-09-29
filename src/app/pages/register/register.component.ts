import { Component,ViewEncapsulation } from "@angular/core";
import { FormBuilder,AbstractControl,Validators,FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { EqualValidator,EmailValidator } from "./validators";
import { RegisterService } from "./register.service";

@Component({
  selector:"page-register",
  templateUrl:"./register.html",
  styleUrls:["./register.scss"],
  encapsulation:ViewEncapsulation.None,
  providers:[RegisterService]
})

export class RegisterComponent{
  public editForm:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public passwords:FormGroup;
  public email:AbstractControl;
  public repassword:AbstractControl;

  public isCheckEmail:boolean;

  constructor(private _fb:FormBuilder,
              private _service:RegisterService,
              private router:Router){
    this.editForm = this._fb.group({
      "email":["",Validators.compose([Validators.required,EmailValidator.validate])],
      "username":["",Validators.compose([Validators.required])],
      "passwords":this._fb.group({
        "password":["",Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])],
        "repassword":["",Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])]
      },{validator:EqualValidator.validate("password","repassword")})
    });
    this.username = this.editForm.controls["username"];
    this.email = this.editForm.controls["email"];
    this.passwords =  <FormGroup> this.editForm.controls['passwords'];
    this.password = this.passwords.controls["password"];
    this.repassword = this.passwords.controls["repassword"];
  }

  ngOnInit(){

  }

  // 注册
  register(){
    if(this.editForm.valid && !this.isCheckEmail){
      this._service.registerUser(this.editForm.value).subscribe(
        ({result}) => {
          console.log(result);
          if(result){
            localStorage.setItem("id_token",result.token);
            this.router.navigate(["/"]);
            this.editForm.reset()
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }
  // 检查是否登录
  public getEmail(email:string){
    if(this.email.valid){
      this._service.checkEmail(email).subscribe(({result}) => {
        if(result){
          this.isCheckEmail = true;
        }else{
          this.isCheckEmail = false;
        }
      })
    }

  }
}
