import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from './core/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingComponent],
  template: `
    <p-toast [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" position="top-right" />
    <app-loading />
    <router-outlet />
  `,
})
export class AppComponent {
  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
