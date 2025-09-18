import { Routes } from '@angular/router';

import { pendingChangesGuard } from '@shared/shared-form/guards';

export const routes: Routes = [
  {
    path: 'items',
    loadComponent: () => import('@items/views/items-form/items-form.component').then(m => m.ItemsFormComponent),
    canDeactivate: [pendingChangesGuard]
  },
  {
    path: 'summary',
    loadComponent: () => import('@summary/views/summary-view/summary-view.component').then(m => m.SummaryViewComponent)
  },
  {
    path: '404',
    loadComponent: () => import('@layout/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  },
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];
