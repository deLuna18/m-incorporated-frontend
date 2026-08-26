import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login/login';
import { authGuard } from './app/guard/auth.guard';
import { loginGuard } from './app/guard/login.guard';
import { GetStartedWidget } from './app/pages/landing/components/get-started/get-started.component';
import { HomeComponent } from './app/pages/public/home/home.component';
import { ModelsComponent } from './app/pages/public/models/models.component';
import { ModelProfileComponent } from './app/pages/public/model-profile/model-profile.component';
import { BookingComponent } from './app/pages/public/booking/booking.component';
import { GalleryComponent } from './app/pages/public/gallery/gallery.component';
import { ContactComponent } from './app/pages/public/contact/contact.component';
import { ServicesComponent } from './app/pages/public/services/services.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'models', component: ModelsComponent },
    { path: 'model-profile', component: ModelProfileComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'landing', component: Landing },
    { path: 'get-started-widget', component: GetStartedWidget },
    { path: 'login', component: Login, canActivate: [loginGuard] },
    // {
    //     path: '',
    //     component: AppLayout,
    //     canActivate: [authGuard],
    //     children: [
    //         { path: 'dashboard', component: Dashboard },
    //         { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes').then((m) => m.default) },
    //         { path: 'documentation', component: Documentation },
    //         { path: 'general-settings', loadChildren: () => import('./app/pages/pages.routes').then((m) => m.default) }
    //     ]
    // },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
