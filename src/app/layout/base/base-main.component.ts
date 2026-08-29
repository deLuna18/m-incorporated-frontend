import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

interface IUserPayload {
    name: string;
    role: number;
    sub: string;
    username: string;
}

@Component({
    selector: 'base-main-page',
    template: `<p>Base Main Page Component Works</p>`,
    styles: []
})
export abstract class BaseMainComponent {
    jwtHelper = new JwtHelperService();

    userPayload: IUserPayload = <IUserPayload>{};

    constructor() {
        const payload = this.jwtHelper.decodeToken(localStorage.getItem('access_token') || '');
        const storedUser = JSON.parse(localStorage.getItem('logged_user') || '{}');
        this.userPayload.name = payload?.name || storedUser.name || 'Moderator';
        this.userPayload.role = payload?.role || storedUser.role || 0;
        this.userPayload.sub = payload?.sub || storedUser.id || '';
        this.userPayload.username = payload?.username || storedUser.username || '';
    }
}
