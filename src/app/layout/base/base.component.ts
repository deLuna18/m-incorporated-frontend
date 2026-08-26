import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { User } from '../../interface/user/user';

@Component({
    selector: 'app-base',
    template: `<p>Base Component Works</p>`,
    styles: [],
    providers: [MessageService]
})
export class BaseComponent {
    //#region members
    icon!: string;
    title!: string;
    id!: string;

    currentUser!: User;

    private jwtHelper = new JwtHelperService();

    sub!: string;

    payload!: {};
    //#endregion

    //#region constructor
    constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public messageBox: MessageService
    ) {
        if (this.router.getCurrentNavigation()) {
            this.title = this.router.getCurrentNavigation()?.extras.state?.['label'];
            this.payload = this.router.getCurrentNavigation()?.extras.state?.['payload'];

            sessionStorage.setItem('page-title', this.title);
        } else {
            this.title = sessionStorage.getItem('page-title') || '';
        }

        let _payload = this.jwtHelper.decodeToken(localStorage.getItem('access_token') || '');
        this.sub = _payload.sub;

        const _aa = localStorage.getItem('logged_user') || '';
        if (_aa) {
            this.currentUser = JSON.parse(_aa);
        }
    }

    //#endregion

    //#region methods

    onNavigateBack() {
        this.router.navigate(['../'], { relativeTo: this.activeRoute, state: { title: this.title, icon: this.icon } });
    }

    navigate(route: string) {
        this.router.navigate([route], { relativeTo: this.activeRoute });
    }

    //#endregion
}
