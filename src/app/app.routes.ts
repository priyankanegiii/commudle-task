import { Routes } from '@angular/router';

export const routes: Routes = [
    {path : '', loadComponent: () => import('./components/homepage/homepage.component').then(m => m.HomepageComponent)},
    {path : 'gitpage', loadComponent: () => import('./components/gitpage/gitpage.component').then(m => m.GitpageComponent)},
    {path : 'bookmarkpage', loadComponent: () => import('./components/bookmarkpage/bookmarkpage.component').then(m => m.BookmarkpageComponent)}
];
