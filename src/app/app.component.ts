import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Paths } from './app-routing.module'

@Component({
  selector: 'sofie-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'NgSofie';

  constructor(private router: Router) {
  }

  navigateHome(): void {
    this.router.navigate([Paths.HOME])
  }

  navigateToRundown(): void {
    this.router.navigate([Paths.RUNDOWNS])
  }
}
