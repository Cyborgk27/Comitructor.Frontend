import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  @Input() label: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() errorMsg: string = '';

  get hasError(): boolean {
    return !!(this.control && this.control.errors && (this.control.dirty || this.control.touched));
  }
}
