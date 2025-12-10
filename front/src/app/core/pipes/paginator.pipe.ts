import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginator',
  standalone: true
})
export class PaginatorPipe implements PipeTransform {

  transform(items: any[] | null, currentPage: number, itemsPerPage: number, setCount: (count: number) => void): any[] | null {
    if (!items) {
      setCount(0);
      return [];
    }
    setCount(items.length);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

}
