import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'lenght'
})
export class LenghtPipe implements PipeTransform {

  constructor(
  ) {
  }

  transform(value:any,size?:any):any {
    if (!value) return null;
    //size tanımlanmışsa onu kullan tanımlanmamışsa 255 olarak kullan
    size=size? size:255
    return size-value.length;



  }

}
