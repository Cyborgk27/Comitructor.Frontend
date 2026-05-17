import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'accent' | 'ghost' | 'error' | 'success' | 'outline' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: string;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  /**
   * Mapea las variantes a las clases de DaisyUI
   */
  get buttonClasses(): string {
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
    ];

    if (this.fullWidth) classes.push('w-full');
    if (this.loading) classes.push('btn-disabled'); // Opcional, DaisyUI tiene su propio loader

    return classes.join(' ');
  }

  handleEvent(event: MouseEvent) {
    if (!this.loading && !this.disabled) {
      this.onClick.emit(event);
    }
  }
}
