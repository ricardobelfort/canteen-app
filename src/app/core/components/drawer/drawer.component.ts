import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '@core/auth/enums/roles.enum';
import { AppMenuItem } from '@core/interfaces/app-menu-item';
import { AuthService } from '@pages/public/auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Input() menuItems: AppMenuItem[] = [];
  @Output() closeDrawer = new EventEmitter<void>();

  private el = inject(ElementRef);
  private authService = inject(AuthService);

  user?: any;
  userRoles: string[] = [];
  UserRole = UserRole;
  openSubmenus: Record<string, boolean> = {};

  constructor() {
    this.getUser();
  }

  toggleSubmenu(menuLabel: string) {
    this.openSubmenus[menuLabel] = !this.openSubmenus[menuLabel];
  }

  isSubmenuOpen(menuLabel: string): boolean {
    return !!this.openSubmenus[menuLabel];
  }

  @HostListener('document:click', ['$event'])
  closeOnClickOutside(event: Event) {
    if (this.isOpen && !this.el.nativeElement.contains(event.target)) {
      this.closeDrawer.emit();
    }
  }

  getUser() {
    this.user = this.authService.decodeToken();
    this.userRoles = this.authService.getUserRoles();
  }
}
