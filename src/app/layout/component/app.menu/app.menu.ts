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
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                        visible: this.fnValidRouteValidator('Dashboard')
                    }
                ]
            },
            {
                label: 'General Settings',
                items: [
                    { label: 'Sample', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/sample'], visible: this.fnValidRouteValidator('Sample') },
                    { label: 'Type of Procurement', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/type-of-procurement'], visible: this.fnValidRouteValidator('Type of Procurement') },
                    { label: 'Type of Supplies', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/type-of-supplies'], visible: this.fnValidRouteValidator('Type of Supplies') },
                    { label: 'Source of Fund', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/source-of-fund'], visible: this.fnValidRouteValidator('Source of Fund') },
                    { label: 'Mode of Procurement', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/mode-of-procurement'], visible: this.fnValidRouteValidator('Mode of Procurement') },
                    { label: 'Physical Count Management', icon: 'pi pi-fw pi-home', routerLink: ['/general-settings/physical-count-management'], visible: this.fnValidRouteValidator('Physical Count Management') }
                ].filter((item) => item.visible)
            }
        ];

        this.model = this.model
            .map((menu) => ({
                ...menu,
                command: () => menu.items?.map((item) => (item.state = { label: item.label, payload: this.loginApiService.getPayload() })),
                items: menu.items?.filter((item) => item.visible) ?? []
            }))
            .filter((menu) => menu.items.length > 0);
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
