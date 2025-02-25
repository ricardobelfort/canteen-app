import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  template: `
    <p-toast [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" position="bottom-right" />
    <router-outlet />
  `,
})
export class AppComponent {}
