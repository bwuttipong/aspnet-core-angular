import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../core/services/likes-service';
import { Member } from '../../types/member';
import { MemberCard } from '../members/member-card/member-card';
import { PaginatedResult } from '../../types/pagination';

@Component({
  imports: [MemberCard],
  selector: 'app-lists',
  styleUrl: './lists.css',
  templateUrl: './lists.html',
})
export class Lists implements OnInit {
  private likesService = inject(LikesService);
  protected paginationResult = signal<PaginatedResult<Member> | null>(null);
  protected predicate = 'liked';
  protected pageNumber = 1;
  protected pageSize = 5;

  tabs = [
    {label: 'Liked', value: 'liked'},
    {label: 'Liked me', value: 'likeBy'},
    {label: 'Mutual', value: 'mutual'}
  ]

  ngOnInit(): void {
    this.loadLikes();
  }

  setPredicate(predicate: string) {
    if (this.predicate !== predicate) {
      this.predicate = predicate;
      this.pageNumber = 1;
      this.loadLikes();
    }
  }

  loadLikes() {
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => this.paginationResult.set(response)
    })
  }

  onPageChange(event: { pageNumber: number, pageSize: number }) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageNumber;
    this.loadLikes();
  }
}
