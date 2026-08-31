import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '../app.menuitem';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BaseMainComponent } from '../../base/base-main.component';
import { User } from '../../../interface/user/user';
import { LoginApiService } from '../../../api/login/login.api.service';
import { UserTypes } from '../../../enums/user-types';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, PanelMenuModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html'
})
export class AppMenu extends BaseMainComponent implements OnInit {
    model: MenuItem[] = [];

    currentUser!: User;

    ngOnInit() {
        const _aa = localStorage.getItem('logged_user') || '';
        if (_aa) {
            this.currentUser = JSON.parse(_aa);
        }
        this.model = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin/dashboard'],
                visible: this.fnValidRouteValidator('Dashboard')
            },
            {
                label: 'Model Management',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/admin/models'],
                visible: this.fnValidRouteValidator('Model Management')
            },
            {
                label: 'Gallery Management',
                icon: 'pi pi-fw pi-images',
                routerLink: ['/admin/gallery'],
                visible: this.fnValidRouteValidator('Gallery Management')
            },
            {
                label: 'Customer Enquiries',
                icon: 'pi pi-fw pi-envelope',
                routerLink: ['/admin/enquiries'],
                visible: this.fnValidRouteValidator('Customer Enquiries')
            },
            {
                label: 'Blog & News Management',
                icon: 'pi pi-fw pi-book',
                visible: true,
                routerLink: ['/admin/blog']
            },
            {
                label: 'Booking Inquiry Management',
                icon: 'pi pi-fw pi-calendar',
                visible: true,
                routerLink: ['/admin/booking-inquiries']
            },
            {
                label: 'Model Portfolio & Video',
                icon: 'pi pi-fw pi-images',
                visible: true,
                routerLink: ['/admin/model-portfolios']
            },
            {
                label: 'Media Library',
                icon: 'pi pi-fw pi-folder-open',
                visible: true,
                routerLink: ['/admin/media-library']
            },
            {
                label: 'General Settings',
                icon: 'pi pi-fw pi-cog',
                visible: true,
                routerLink: ['/admin/settings']
            }
        ];

        this.model = this.model
            .filter((item) => item.visible)
            .map((item) => ({ ...item, command: () => (item.state = { label: item.label, payload: this.loginApiService.getPayload() }) }));
    }

    constructor(
        private loginApiService: LoginApiService,
        public router: Router,
        public activeRoute: ActivatedRoute
    ) {
        super();
    }

    fnAdminValidator(parent_route: string) {
        // return true;

        const _role = UserTypes[this.currentUser.type];
        if (_role) {
            const _admin = _role.toLowerCase().includes('admin');
            if (_admin) {
                return true;
            } else {
                const _parent = this.currentUser.userrole?.userroleform?.filter((prop) => prop.userform?.parent_form.toLowerCase().includes(parent_route.toLowerCase()));
                console.log(_parent);
                if (_parent && _parent.length) {
                    return true;
                }
            }
        }

        return false;
    }

    fnValidRouteValidator(form_route: string) {
        const _role = UserTypes[this.currentUser.type];
        if (_role) {
            const _admin = _role.toLowerCase().includes('admin');
            if (_admin) {
                return true;
            } else {
                const _parent = this.currentUser.userrole?.userroleform?.filter((prop) => prop.userform?.form.toLowerCase().trim() === form_route.toLowerCase().trim());
                console.log(_parent);
                if (_parent && _parent.length) {
                    return true;
                }
            }
        }

        return false;
    }
}
