import { Routes } from '@angular/router';
import { authGuardGuard } from '../guards/auth-guard-guard';
export const controlPanelRoutes: Routes = [
    {
        path: '',
        
        canActivate: [authGuardGuard],
        children: [
            {
                path:'control-panel',
                loadComponent: () => 
                    import('../../features/dashboard/components/control-panel/control-panel').then(m => m.ControlPanel)
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('../../features/profile/pages/profile-pages/profile-pages').then(m => m.ProfilePage)
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('../../features/user/pages/user-pages/user-pages').then(m => m.UserPages)
            },
            {
                path: 'cars',
                loadComponent: () =>
                    import('../../features/cars/page/page-cars/page-cars').then(m => m.PageCars)
            }
        ]
    }
]