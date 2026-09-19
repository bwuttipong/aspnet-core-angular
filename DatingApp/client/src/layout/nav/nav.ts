import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  imports: [FormsModule],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  private accountService = inject(AccountService);
  protected creds: any = {
    email: 'bob@test.com',
    password: 'password'
  }
  protected loggedIn = signal(false);

  login() {
    // console.log(this.creds);
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result)
        this.loggedIn.set(true);
      },
      error: error => alert(error.message)
    });
  }

  logout() {
    this.loggedIn.set(false);
  }
}
