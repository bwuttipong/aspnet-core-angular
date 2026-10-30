import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, Photo } from '../../types/member';
import { tap } from 'rxjs';
// import { AccountService } from './account-service';

@Service()
export class MemberService {
    private http = inject(HttpClient);
    // private accountService = inject(AccountService);
    private baseUrl = environment.apiUrl;
    editMode = signal(false);
    member = signal<Member | null>(null);
    getMembers() {
         return this.http.get<Member[]>(this.baseUrl + 'members');
        // return this.http.get<Member[]>(this.baseUrl + 'members', this.getHttpOptions());
    }

    getMember(id: string) {
        return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(
            tap(member => {
                this.member.set(member)
            })
        );
        // return this.http.get<Member>(this.baseUrl + 'members/' + id, this.getHttpOptions());
    }

    getMemberPhotos(id: string) {
        return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
        // return this.http.get<Member>(this.baseUrl + 'members/' + id + '/photos', this.getHttpOptions());
    }

    updateMember(member: EditableMember) {  
        return this.http.put(this.baseUrl + 'members', member);
    }

    // private getHttpOptions() {
    //     return {
    //         headers: new HttpHeaders({
    //             Authorization: 'Beare ' + this.accountService.currentUser()?.token
    //         })
    //     }
    // }

    uploadPhoto(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Photo>(this.baseUrl + 'members/add-photo', formData);
    }

    setMainPhoto(photo: Photo) {
        return this.http.put(this.baseUrl + 'members/set-main-photo/' + photo.id, {})
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'members/delete-photo/' + photoId)
    }
}
