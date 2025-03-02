import { UserRole } from '@core/auth/enums/roles.enum';
import { MenuItem } from 'primeng/api';

export interface AppMenuItem extends MenuItem {
  roles: UserRole[];
}
