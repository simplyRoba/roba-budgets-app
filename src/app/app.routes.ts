import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'summary', loadChildren: () => import('./summary/summary.routes') },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes'),
  },
];
