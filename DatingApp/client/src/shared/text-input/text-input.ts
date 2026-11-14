import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-text-input',
  styleUrl: './text-input.css',
  templateUrl: './text-input.html',
})
export class TextInput implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  maxDate = input<string>('');
  
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {
 
  }
  setDisabledState?(isDisabled: boolean): void {

  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
