import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', standalone: true, pure: true })
export class FilterPipe implements PipeTransform {
  transform<T extends object>(items: T[] | null, searchText: string): T[] {
    if (!items) return [];
    const term = (searchText || '').trim().toLowerCase();
    if (!term) return items;
    return items.filter(item =>
      Object.values(item).some(value => String(value ?? '').toLowerCase().includes(term))
    );
  }
}