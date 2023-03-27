import {Pipe, PipeTransform} from '@angular/core';
import {EventV3Model} from '../../models/event-v3-model';

@Pipe({
  name: 'filterActive',
})
export class ActiveEventsPipe implements PipeTransform {
 transform(value: EventV3Model[]): EventV3Model[] {
   return value.filter((e) => e.endTime >= Date.now());
 }
}
