import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Member } from '../../../types/member';

@Component({
  imports: [RouterLink],
  selector: 'app-member-card',
  styleUrl: './member-card.css',
  templateUrl: './member-card.html',
})
export class MemberCard {
  member = input.required<Member>();
}