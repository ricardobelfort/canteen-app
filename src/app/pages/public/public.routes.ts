import { Routes } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { UnauthorizedComponent } from './unauthorized.component';

export const PUBLIC_ROUTES: Routes = [
  { path: 'terms', component: TermsComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];
