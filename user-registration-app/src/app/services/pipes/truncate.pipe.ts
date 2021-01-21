import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'limitTo',
})
export class TruncatePipe implements PipeTransform {
  private static readonly defaultValue = 5

  transform(value: any[], args: string): any[] {
    const limit = args ? parseInt(args, 10) : TruncatePipe.defaultValue
    return value.slice(0, limit)
  }
}
