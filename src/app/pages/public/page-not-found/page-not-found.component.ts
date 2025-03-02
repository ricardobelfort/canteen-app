import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-not-found',
  imports: [ButtonModule],
  template: `
    <div class="w-full h-full bg-white flex justify-center items-center">
      <div class="w-7xl h-5/6 p-10 flex justify-center items-center gap-24">
        <div class="flex flex-col gap-4">
          <h1 class="text-9xl font-bold text-red-500">404</h1>
          <h2 class="text-3xl font-bold text-red-500">Página não encontrada!</h2>
          <p class="mb-4">A página que você tentou acessar não existe.</p>
          <p-button label="Voltar" icon="pi pi-arrow-left" (onClick)="goBack()" />
        </div>
        <img src="assets/images/protection.png" alt="" />
      </div>
    </div>
  `,
})
export class PageNotFoundComponent {
  goBack(): void {
    history.back();
  }
}
