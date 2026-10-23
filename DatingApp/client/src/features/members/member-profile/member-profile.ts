import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [DatePipe, FormsModule],
  selector: 'app-member-profile',
  styleUrl: './member-profile.css',
  templateUrl: './member-profile.html',
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private accountServer = inject(AccountService);
  protected memberService = inject(MemberService);
  // private route = inject(ActivatedRoute);
  // protected member = signal<Member | undefined>(undefined);
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''
  }
  private toast = inject(ToastService)


  ngOnInit(): void {
    // this.route.parent?.data.subscribe(data => {
    //   this.member.set(data['member']);
    // });

    // this.editableMember = {
    //   displayName: this.member()?.displayName || '',
    //   description: this.member()?.description || '',
    //   city: this.member()?.city || '',
    //   country: this.member()?.city || ''
    // }

    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.city || ''
    }
  }

  updateProfile(){
    if (!this.memberService.member()) return
    const updateMember = {...this.memberService.member(), ...this.editableMember}
    // console.log(updateMember);
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountServer.currentUser();
        if (currentUser && updateMember.displayName !== currentUser?.displayName) {
          currentUser.displayName = updateMember.displayName;
          this.accountServer.setCurrentUser(currentUser);
        }
        this.toast.success("Profile updated successfully");
        this.memberService.editMode.set(false);
        this.memberService.member.set(updateMember as Member);
        this.editForm?.reset(updateMember);
      }
    });
    this.toast.success('Profile updated successfully');
    this.memberService.editMode.set(false);
  }

  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
