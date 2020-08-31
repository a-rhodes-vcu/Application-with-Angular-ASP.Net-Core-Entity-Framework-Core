import { Component } from '@angular/core'
import { AuthService } from './auth.service'

@Component({
  selector: 'nav',
  template: `
  <md-toolbar>
    <button md-button routerLink="/">My Quiz</button>
    <button md-button routerLink="/play">Play</button>
    <span style="flex: 1 1 auto;"></span>
    <button *ngIf="!auth.isAuthenticated" md-button routerLink="/register">Register</button>
    <button *ngIf="!auth.isAuthenticated" md-button routerLink="/login">Login</button>
    <button *ngIf="auth.isAuthenticated" md-button (click)="auth.logout()">Logout</button>
  </md-toolbar>
  `
})
export class NavComponent {
  constructor(private auth: AuthService) {}

}
