import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { Error404 } from './features/pages/error-404/error-404';
import { CategoryNew } from './features/pages/categories/category-new/category-new';

export const routes: Routes = [
    // No olvidar que las rutas deben estar ordenadas de menor a mayor especificidad
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'error-404', component: Error404 },
    // Rutas de categorías
    { path: 'dashboard/category/new', component: CategoryNew },
    // Las redirecciones deben estar al final
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'error-404', pathMatch: 'full' },
];
