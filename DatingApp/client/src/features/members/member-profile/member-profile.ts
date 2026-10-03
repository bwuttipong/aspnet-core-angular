import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../types/member';

@Component({
  imports: [],
  selector: 'app-member-profile',
  styleUrl: './member-profile.css',
  templateUrl: './member-profile.html',
})
export class MemberProfile implements OnInit {

  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data['member']);
    });
  }
}
