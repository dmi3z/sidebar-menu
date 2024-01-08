import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/card-list/card-list.component').then((c) => c.CardListComponent),
    },
];
