import { Routes } from '@angular/router';
import { authGuardGuard } from '../guards/auth-guard-guard';
import { roleGuard } from '../guards/role-guard.guard';
import { RolesGuards as Role } from '../interfaces/user.interfaces';
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
                data: { roles: [Role.ADMIN, Role.CUSTOMER_SERVICE] }
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
                data: { roles: [Role.ADMIN, Role.CUSTOMER_SERVICE] }
            },
            {
                path: 'cars',
                loadComponent: () =>
                    import('../../features/cars/page/page-cars/page-cars').then(m => m.PageCars),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN, Role.CUSTOMER_SERVICE] }
            },
            {
                path:'userCars',
                loadComponent: () =>
                    import('../../features/cars/page/user-cars-page/user-cars-page').then(m => m.UserCarsPage),
                canActivate: [roleGuard],
                data: { roles: [Role.CLIENT] }
            },
            {
                path:'parts',
                loadComponent: () =>
                    import('../../features/parts/pages/parts-pages/parts-pages').then(m => m.PartsPages),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN, Role.WAREHOUSE_MANAGER] }
            },
            {
                path:'appoinment-user',
                loadComponent: () =>
                    import('../../features/appointment/page/appointment-user-page/appointment-user-page').then(m => m.AppointmentUserPage),
                canActivate: [roleGuard],
                data: { roles: [Role.CLIENT, Role.MECHANIC] }
            },
            {
                path:'services-panel',
                loadComponent: () =>
                    import('../../features/services-offered/pages/services-page/services-page').then(m => m.ServicesPage),
                    canActivate: [roleGuard],
                    data: { roles: [Role.ADMIN, Role.CUSTOMER_SERVICE, Role.WAREHOUSE_MANAGER] }
                },
                {
                path:'employee-panel',
                loadComponent: () =>
                    import('../../features/user/pages/employee-pages/employee-pages').then(m => m.EmployeePages),
                canActivate: [roleGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path:'notification-user/:rol/:id',
                loadComponent: () =>
                    import('../../features/notifications/pages/notification-page/notification-page').then(m => m.NotificationPage),
            },
            {
                path:'invoice-appointment/:id',
                loadComponent: () =>
                    import('../../features/invoice/components/invoice-appointment-user/invoice-appointment-user').then(m => m.InvoiceAppointmentUser),
                canActivate: [roleGuard],
                data: { roles: [Role.CLIENT] }
            },
        ]
    }
]