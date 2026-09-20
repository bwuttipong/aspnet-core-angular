import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {
    email: 'bob@test.com',
    password: 'password'
  }
  // protected loggedIn = signal(false);

  login() {
    // console.log(this.creds);
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        // this.creds = {};
        // console.log(result)
        // this.loggedIn.set(true);
      },
      error: error => {
        this.toast.error(error.error)
      }
    });
  }

  logout() {
    // this.loggedIn.set(false);
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
