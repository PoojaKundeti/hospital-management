import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  @Input() action: 'add' | 'edit' | 'delete' | 'view' = 'view';
  @Input() label = 'View';
  @Output() clicked = new EventEmitter<'add' | 'edit' | 'delete' | 'view'>();
}