import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, Photo } from '../../types/member';
// import { AccountService } from './account-service';

@Service()
export class MemberService {
    private http = inject(HttpClient);
    // private accountService = inject(AccountService);
    private baseUrl = environment.apiUrl;
    editMode = signal(false);

    getMembers() {
         return this.http.get<Member[]>(this.baseUrl + 'members');
        // return this.http.get<Member[]>(this.baseUrl + 'members', this.getHttpOptions());
    }

    getMember(id: string) {
        return this.http.get<Member>(this.baseUrl + 'members/' + id);
        // return this.http.get<Member>(this.baseUrl + 'members/' + id, this.getHttpOptions());
    }

    getMemberPhotos(id: string) {
        return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
        // return this.http.get<Member>(this.baseUrl + 'members/' + id + '/photos', this.getHttpOptions());
    }

    // private getHttpOptions() {
    //     return {
    //         headers: new HttpHeaders({
    //             Authorization: 'Beare ' + this.accountService.currentUser()?.token
    //         })
    //     }
    // }
}
