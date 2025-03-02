import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Genre } from '@core/interfaces/genre';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

interface State {
  id: number;
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    IftaLabelModule,
    InputTextModule,
    SelectModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  states: State[] = [];
  cities: City[] = [];

  genres: Genre[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outros', value: 'O' },
  ];

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    genre: ['', Validators.required],
    state: ['', Validators.required],
    city: [{ value: '', disabled: true }, Validators.required],
  });

  get firstName() {
    return this.signupForm.get('firstName');
  }

  ngOnInit() {
    this.getStates();
  }

  getStates() {
    this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').subscribe({
      next: (data) => {
        this.states = data.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar estados',
        });
      },
    });
  }

  getCities() {
    const selectedStateSigla = this.signupForm.get('state')?.value;

    if (!selectedStateSigla) {
      this.signupForm.get('city')?.disable();
      return;
    }

    const state = this.states.find((state) => state.sigla === selectedStateSigla);

    if (!state) {
      this.signupForm.get('city')?.disable();
      return;
    }

    const stateId = state.id;

    this.http
      .get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
      .subscribe({
        next: (data) => {
          this.cities = data.sort((a, b) => a.nome.localeCompare(b.nome));

          if (this.cities.length > 0) {
            this.signupForm.get('city')?.enable();
          } else {
            this.signupForm.get('city')?.disable();
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar cidades',
          });
          this.signupForm.get('city')?.disable();
        },
      });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
