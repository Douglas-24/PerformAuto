import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

 transform(items: any[] | null, searchText: string, properties: string[] = []): any[] | null {
    if (!items || !searchText) {
      return items; 
    }

    const term = searchText.toLowerCase().trim();
    if (!term) {
        return items;
    }

    return items.filter(item => {
      const keys = properties.length > 0 ? properties : Object.keys(item as object).filter(key => typeof (item as any)[key] === 'string');

      return keys.some(key => {
        const value = (item as any)[key];
        
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(term);
        }
        return false;
      });
    });
  }

}
