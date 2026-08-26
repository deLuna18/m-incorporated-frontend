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
        let _payload = this.jwtHelper.decodeToken(localStorage.getItem('access_token') || '');
        if (_payload) {
            this.userPayload.name = _payload.name || '';
            (this.userPayload.role = _payload.role || ''), (this.userPayload.sub = _payload.sub || '');
            this.userPayload.username = _payload.username || '';
        }
    }
}
