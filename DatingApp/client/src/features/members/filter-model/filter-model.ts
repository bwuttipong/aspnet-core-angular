import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../types/member';

@Component({
  imports: [],
  selector: 'app-filter-model',
  styleUrl: './filter-model.css',
  templateUrl: './filter-model.html',
})
export class FilterModel {
  @ViewChild('filterModel') modalRef!: ElementRef<HTMLDialogElement>;
  closeModel = output();
  submitDdata = output<MemberParams>();

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.closeModel.emit();
  }

  submit() {
    this.submitDdata.emit(new MemberParams());
    this.close();
  }
}
