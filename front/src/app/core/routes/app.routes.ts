import { Routes } from '@angular/router';
import { HomeComponent } from '../../features/main/pages/home-component/home-component';
import { authGuardGuard } from '../guards/auth-guard-guard';
import { MainLayout } from '../../features/main/pages/main-layout/main-layout';
import { controlPanelRoutes } from './controlPanel.routes';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'auth',
        loadComponent: () => import('../../features/auth/page/auth-page/auth-page').then(m => m.AuthPage)
        
    },
    {
        path:'unauthorized',
        loadComponent: () => import('../../shared/unauthorized-page/unauthorized-page').then(m => m.UnauthorizedPage)
    },
    {
        path: 'verifyAccout',
        loadComponent:  () => import('../../shared/verify-account-page/verify-account-page').then(m => m.VerifyAccountPage),
        canActivate:[authGuardGuard]
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuardGuard],
        children: controlPanelRoutes
    }
];
