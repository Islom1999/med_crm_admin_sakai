import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { canActivatePermission } from './shared';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { 
                        path: '', 
                        loadChildren: () => import('./modules').then(m => m.RoleModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'role', 
                        loadChildren: () => import('./modules').then(m => m.RoleModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'departament', 
                        loadChildren: () => import('./modules').then(m => m.DepartamentModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'appointment', 
                        loadChildren: () => import('./modules').then(m => m.AppointmentModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'patient', 
                        loadChildren: () => import('./modules').then(m => m.PatientModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'rooms', 
                        loadChildren: () => import('./modules').then(m => m.RoomsModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'sallary', 
                        loadChildren: () => import('./modules').then(m => m.SallaryModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'schemodule', 
                        loadChildren: () => import('./modules').then(m => m.SchemoduleModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'services', 
                        loadChildren: () => import('./modules').then(m => m.ServicesModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'staff', 
                        loadChildren: () => import('./modules').then(m => m.StaffModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                    { 
                        path: 'files', 
                        loadChildren: () => import('./modules').then(m => m.FilesModule), 
                        canActivate: [canActivatePermission],
                        data: { permissions: ['super'] }
                    },
                ]
            },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
