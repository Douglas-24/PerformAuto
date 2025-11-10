import { Routes } from '@angular/router';
import { authGuardGuard } from '../guards/auth-guard-guard';
import { roleGuard } from '../guards/role-guard.guard';
import { Role } from '../interfaces/user.interfaces';
export const controlPanelRoutes: Routes = [
    {
        path: '',
        
        canActivate: [authGuardGuard],
        children: [
            {
                path:'control-panel',
                loadComponent: () => 
                    import('../../features/dashboard/components/control-panel/control-panel').then(m => m.ControlPanel),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('../../features/profile/pages/profile-pages/profile-pages').then(m => m.ProfilePage)
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('../../features/user/pages/user-pages/user-pages').then(m => m.UserPages),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'cars',
                loadComponent: () =>
                    import('../../features/cars/page/page-cars/page-cars').then(m => m.PageCars),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN] }
            }
        ]
    }
]