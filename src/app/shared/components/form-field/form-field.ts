import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  @Input() label: string = '';
  @Input() error: string | boolean | null = null;
}
