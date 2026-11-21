import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from '../member-card/member-card';
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';


@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
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
}
