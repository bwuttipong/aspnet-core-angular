import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Nav } from '../layout/nav/nav';
// import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
// import { User } from '../types/user';
import { NgClass } from '@angular/common';

@Component({
  // imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [Nav, RouterOutlet],
})
export class App  { // implements OnInit
    // And instead we can use an inject method that we get from angular. 
    // So the ordering of things inside a component is not that 
    // important, but typically what we'd use or 
    // how we would lay it out is we would have things that we inject at
    // the top of the class.
    // private accountService = inject(AccountService);
    protected router = inject(Router)
    private http = inject(HttpClient); // this's how we inject something or can inject somthing into an angular component
    // protected readonly title = signal('client');
    // protected readonly title = "Dating app";
    // protected members: any;
    // protected members = signal<User[]>([]);
    // this's how we inject something or can inject somthing into an angular component
    // constructor(private http: HttpClient) {
    // And then we don't need our constructor because we have it injected here.
    // }

    // async ngOnInit(): Promise<void> {
      // this.http.get('https://localhost:5001/api/members').subscribe({
      //   next: (response) => {
      //     // console.log(response);
      //     this.members.set(response);
      //   },
      //   error: (error) => { 
      //     console.error(error);
      //   },
      //   complete: () => {
      //     // automatic unsubscribe when the request is completed, so we don't have to worry about unsubscribing from the observable.
      //     console.log('Completed the http request');
      //   }
      // });
      // this.members.set(await this.getMembers());
      // this.setCurrentUser();
    // }
    // changed to use init service instead of
    // setCurrentUser() {
    //   const userString = localStorage.getItem('user');

    //   if (!userString) return;
    //   const user = JSON.parse(userString);
    //   this.accountService.currentUser.set(user);

    // }

    // async getMembers() {
    //   try {
    //     return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
}
