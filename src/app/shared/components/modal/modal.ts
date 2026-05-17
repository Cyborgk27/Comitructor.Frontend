import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() saveLabel = 'Guardar';
  @Input() showSave = true;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
}
