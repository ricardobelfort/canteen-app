import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/public/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  mostrarSaldo: boolean = false;
  mostrarCartao: boolean = false;
  dataConsulta: string = '';
  loading: boolean = false;

  usuario = {
    temCartao: false,
    numeroCartao: '1234 5678 9012 3456',
    nome: 'Ricardo Belfort',
    validadeCartao: '12/24',
  };

  constructor() {
    this.atualizarDataConsulta();
  }

  atualizarDataConsulta() {
    const agora = new Date();
    const dia = agora.getDate();
    const mes = agora.getMonth() + 1; // Janeiro é 0
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');

    this.dataConsulta = `${dia}/${mes} às ${horas}:${minutos}h`;
  }

  consultarSaldo() {
    if (this.loading) return;

    this.loading = true; // Ativa o estado de carregamento do botão
    setTimeout(() => {
      this.atualizarDataConsulta();
      this.loading = false; // Desativa o carregamento após a simulação
    }, 1000); // Simula um tempo de carregamento
  }

  user$ = this.authService.user$.pipe(
    map((user) => {
      if (!user) return null;
      return JSON.parse(JSON.stringify(user));
    })
  );

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
