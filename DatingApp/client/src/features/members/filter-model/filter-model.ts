import { Component, ElementRef, input, model, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../types/member';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-filter-model',
  styleUrl: './filter-model.css',
  templateUrl: './filter-model.html',
})
export class FilterModel {
  @ViewChild('filterModel') modalRef!: ElementRef<HTMLDialogElement>;
  closeModel = output();
  submitDdata = output<MemberParams>();
  // memberParams = new MemberParams();
  memberParams = model(new MemberParams());

  constructor() {
    const filters = localStorage.getItem('filters');
    if(filters) {
      this.memberParams.set(JSON.parse(filters));
    }  
  }

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.closeModel.emit();
  }

  submit() {
    this.submitDdata.emit(this.memberParams());
    this.close();
  }

  onMinAgeChange() {
    if (this.memberParams().minAge < 18) this.memberParams().minAge = 18;
  }

  onMaxAgeChange () {
    if(this.memberParams().maxAge < this.memberParams().minAge) {
      this.memberParams().maxAge = this.memberParams().minAge;
    }
  }
}
