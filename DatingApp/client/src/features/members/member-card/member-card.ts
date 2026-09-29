import { Component, input } from '@angular/core';
import { Member } from '../../../types/member';

@Component({
  imports: [],
  selector: 'app-member-card',
  styleUrl: './member-card.css',
  templateUrl: './member-card.html',
})
export class MemberCard {
  member = input.required<Member>();
}
