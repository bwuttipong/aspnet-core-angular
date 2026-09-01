import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  // imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
    // And instead we can use an inject method that we get from angular. 
    // So the ordering of things inside a component is not that 
    // important, but typically what we'd use or 
    // how we would lay it out is we would have things that we inject at
    // the top of the class.
  
    private http = inject(HttpClient); // this's how we inject something or can inject somthing into an angular component
    // protected readonly title = signal('client');
    protected readonly title = "Dating app";
    // protected members: any;
    protected members = signal<any>([]);
    // this's how we inject something or can inject somthing into an angular component
    // constructor(private http: HttpClient) {
    // And then we don't need our constructor because we have it injected here.
    // }

    async ngOnInit(): Promise<void> {
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
      this.members.set(await this.getMembers());
    }
 
    async getMembers() {
      try {
        return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}
