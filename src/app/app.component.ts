import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from './core/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingComponent],
  template: `
    <p-toast [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" position="bottom-right" />
    <app-loading />
    <router-outlet />
  `,
})
export class AppComponent {}
