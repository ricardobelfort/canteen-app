import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cep } from '@core/interfaces/cep';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

interface Genre {
  label: string;
  value: string;
}

@Component({
  selector: 'app-users-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    IftaLabelModule,
    CheckboxModule,
    DividerModule,
    SelectModule,
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent {
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
    momsName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
    address: new FormGroup({
      zipCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl(''),
      complement: new FormControl(''),
      neighborhood: new FormControl('', Validators.required),
    }),
  });

  genres: Genre[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outros', value: 'O' },
  ];

  buscarCep() {
    const cep = this.userForm.get('address.zipCode')?.value;

    if (!cep || cep.length < 8) {
      return;
    }

    this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (data) => {
        if (data.erro) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado' });
          return;
        }

        this.userForm.patchValue({
          address: {
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          },
        });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar CEP!' });
        console.error(error);
      },
    });
  }

  submit() {
    console.log(this.userForm.value);
  }
}
