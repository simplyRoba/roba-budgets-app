import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/budgets', pathMatch: 'full' },
  { path: 'budgets', loadChildren: () => import('./overview/overview.routes')},
  { path: 'settings', loadChildren: () => import('./settings/settings.routes') },
];
