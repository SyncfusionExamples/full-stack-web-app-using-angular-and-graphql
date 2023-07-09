import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private readonly authService: AuthenticationService) {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      this.authService.setUserDetails(authToken);
    }
  }
}
