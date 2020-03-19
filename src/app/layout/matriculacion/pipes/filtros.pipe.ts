import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    for (const item of value) {
      if (item.carrera.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(item);
      }
    }
    return resultPost;
  }

}
