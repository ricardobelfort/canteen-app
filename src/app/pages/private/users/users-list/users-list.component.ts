import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  imports: [TableModule, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  private readonly usersService = inject(UsersService);
  users$ = this.usersService.getUsers();
}
