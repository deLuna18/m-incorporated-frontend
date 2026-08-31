import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login/login';
import { authGuard } from './app/guard/auth.guard';
import { adminGuard } from './app/guard/admin.guard';
import { loginGuard } from './app/guard/login.guard';
import { GetStartedWidget } from './app/pages/landing/components/get-started/get-started.component';
import { HomeComponent } from './app/pages/public/home/home.component';
import { ModelsComponent } from './app/pages/public/models/models.component';
import { ModelProfileComponent } from './app/pages/public/model-profile/model-profile.component';
import { BookingComponent } from './app/pages/public/booking/booking.component';
import { GalleryComponent } from './app/pages/public/gallery/gallery.component';
import { ContactComponent } from './app/pages/public/contact/contact.component';
import { ServicesComponent } from './app/pages/public/services/services.component';
import { AboutComponent } from './app/pages/public/about/about.component';
import { ModelManagementComponent } from './app/pages/model-management/model-management.component';
import { GalleryManagementComponent } from './app/pages/gallery-management/gallery-management.component';
import { EnquiriesComponent } from './app/pages/enquiries/enquiries.component';
import { UserManagementComponent } from './app/pages/user-management/user-management.component';
import { BlogComponent } from './app/pages/public/blog/blog.component';
import { BlogArticleComponent } from './app/pages/public/blog/blog-article.component';
import { PublicLayoutComponent } from './app/shared-component/public-layout/public-layout.component';

export const appRoutes: Routes = [
    {
        path: '', component: PublicLayoutComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'home', redirectTo: '', pathMatch: 'full' },
            { path: 'models', component: ModelsComponent },
            { path: 'model-profile', component: ModelProfileComponent },
            { path: 'booking', component: BookingComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'about', component: AboutComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'blog/:slug', component: BlogArticleComponent }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'get-started-widget', component: GetStartedWidget },
    { path: 'login', redirectTo: 'admin/login', pathMatch: 'full' },
    { path: 'admin/login', component: Login, canActivate: [loginGuard] },
    {
        path: 'admin',
        component: AppLayout,
        canActivate: [authGuard, adminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'models', component: ModelManagementComponent },
            { path: 'gallery', component: GalleryManagementComponent },
            { path: 'enquiries', component: EnquiriesComponent },
            { path: 'users', component: UserManagementComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes').then((m) => m.default) },
            { path: 'documentation', component: Documentation },
            { path: 'general-settings', loadChildren: () => import('./app/pages/pages.routes').then((m) => m.default) }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
