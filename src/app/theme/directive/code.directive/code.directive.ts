import { Pipe,PipeTransform } from "@angular/core";

@Pipe({name:"codePipe"})
export class CodeDirective implements PipeTransform{
  transform(value:string){
    const reg = /^(\d{4})\d+(\d{4})$/;
    return value.replace(reg, "$1****$2");
  }
}
