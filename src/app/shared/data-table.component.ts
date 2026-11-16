import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';
import { ActionButtonComponent } from './action-button.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FilterPipe, ActionButtonComponent],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnChanges {
  @Input() rows: Record<string, any>[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Input() searchText = '';
  @Input() allowActions = false;
  @Output() edit = new EventEmitter<Record<string, any>>();
  @Output() remove = new EventEmitter<Record<string, any>>();
  visibleRows: Record<string, any>[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] || changes['searchText']) {
      this.visibleRows = new FilterPipe().transform(this.rows, this.searchText);
    }
  }
}