import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
   // these can also say a property.
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  membersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected credentialForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);

  constructor() {
    this.credentialForm = this.fb.group({
      email: ['johndoe@test.com', [Validators.required, Validators.email]],
      displayName: ['John Doe', Validators.required],
      password: ['password', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['password', this.matchValues('password')]
    });

    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.credentialForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialForm.controls['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { isMatching: true };
    }
  }

  nextStep() {
    if(this.credentialForm.valid) {
      this.currentStep.update((prevStep) => prevStep + 1);
    }
  }

  prevStep() {
    this.currentStep.update((prevStep) => prevStep - 1);
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register () {
    if (this.profileForm.valid && this.credentialForm.valid) {
      const formData = {...this.credentialForm.value, ...this.profileForm.value};
      console.log('Form Data:', formData);
    }
    // console.log(this.creds);
    // this.accountService.register(this.creds).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => console.log(error)
    // });
  }

  cancel() {
    //console.log('cancelled!')
    this.cancelRegister.emit(false);
  }
}
