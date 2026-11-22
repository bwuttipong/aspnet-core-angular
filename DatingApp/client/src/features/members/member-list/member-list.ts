import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from '../member-card/member-card';
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';
import { FilterModel } from '../filter-model/filter-model';


@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModel],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  @ViewChild('filterModal') modal!: FilterModel;
  private memberService = inject(MemberService)
  // protected paginatedMembers$?: Observable<PaginatedResult<Member>>;
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
  protected memberParams = new MemberParams();

  // constructor() {
  //   // this.paginatedMembers$ = this.memberService.getMembers();
  //   this.loadMembers();
  // }

  ngOnInit(): void {
    this.loadMembers
  }

  loadMembers(){
    //this.paginatedMembers$ = this.memberService.getMembers(this.pageNumber, this.pageSize);
    this.memberService.getMembers(this.memberParams).subscribe({
      next: (result) => {
        this.paginatedMembers.set(result);
      }
    });
  }

  onPageChanged(event: {pageNumber: number, pageSize: number}){ 
    this.memberParams.pageSize = event.pageSize;
    this.memberParams.pageNumber = event.pageNumber;
    this.loadMembers();
  }

  openModel() {
    this.modal.open()
  }

  onClose() {
    console.log('Model closed');
  }

  onFilterChange(data: MemberParams) {
    console.log('Model submitted data: ', data);
  }

  resetFilters() {
    this.memberParams = new MemberParams();
    this.loadMembers();
  }
}
