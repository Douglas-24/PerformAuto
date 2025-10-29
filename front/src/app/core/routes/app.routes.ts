import { Routes } from '@angular/router';
import { HomeComponent } from '../../features/main/pages/home-component/home-component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'auth',
        loadComponent: () => import('../../features/auth/page/auth-page/auth-page').then(m => m.AuthPage)

    },
    {
        path:'profile',
        loadComponent: () => import('../../features/profile/pages/profile-pages/profile-pages').then(m => m.ProfilePage)
    }
];
