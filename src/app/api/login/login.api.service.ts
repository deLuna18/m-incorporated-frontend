import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../interface/user/user';
import { Router } from '@angular/router';
import { ApiMainEndpointService } from '../main.api.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserTypes } from '../../enums/user-types';

@Injectable({
    providedIn: 'root'
})
export class LoginApiService {
    http: HttpClient | undefined;
    api: string;

    _user!: any;
    loggedinUser!: User;

    jwtHelper = new JwtHelperService();

    constructor(
        private router: Router,
        apiMain: ApiMainEndpointService
    ) {
        this.http = apiMain.http;
        this.api = apiMain.urlAuthLogin;
    }

    onLogin(params: any) {
        return new Promise((res, rej) => {
            this.http?.post(this.api, params).subscribe({
                next: async (resp: any) => {
                    if (resp.response) {
                        rej(resp.response.message);
                    }

                    const { access_token } = resp;
                    const _decoded = this.jwtHelper.decodeToken(access_token);

                    // console.log(_decoded);

                    if (_decoded) {
                        if (this.http) {
                            this._user = await firstValueFrom(this.http.get(`${environment.apiUrl}setup-user/${_decoded.sub}`));
                        } else {
                            rej('HTTP client is not initialized');
                            return;
                        }

                        this.loggedinUser = <User>{
                            id: this._user.id,
                            name: this._user.name,
                            type: this._user.type,
                            role: this._user.role,
                            level: this._user.level,
                            username: this._user.username,
                            userrole: this._user.userrole,
                            employee: this._user.employee
                        };
                    }

                    localStorage.setItem('logged_user', JSON.stringify(this.loggedinUser));
                    localStorage.setItem('access_token', access_token);

                    res(true);
                },
                error: (err) => {
                    console.log(err);
                    rej(err);
                }
            });
        });
    }

    loginWithDemoAccount() {
        const demoUser: User = {
            id: 'demo-moderator',
            name: 'Demo Moderator',
            type: UserTypes.Administrator,
            role: UserTypes.Administrator,
            level: 1,
            username: 'demo'
        };
        const payload = {
            sub: demoUser.id,
            role: String(UserTypes.Administrator),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        };
        const accessToken = `demo.${btoa(JSON.stringify(payload))}.session`;

        this.loggedinUser = demoUser;
        localStorage.setItem('logged_user', JSON.stringify(demoUser));
        localStorage.setItem('access_token', accessToken);
    }

    onLogout() {
        localStorage.removeItem('access_token');
        this.loggedinUser = <User>{};
        this.router.navigate(['admin/login']);
    }

    getPayload() {
        if (this.loggedinUser) {
            return this.loggedinUser;
        }

        const token = this.getToken();
        if (!token && token === 'undefined') return;

        const decodedToken = this.jwtHelper.decodeToken(token);
        this.loggedinUser = decodedToken ? decodedToken : <User>{};
        return this.loggedinUser;
    }

    isLoggedIn() {
        const token = this.getToken();
        return token && token !== 'undefined' ? !this.jwtHelper.isTokenExpired(token) : false;
    }

    isLoggedOut() {
        const token = this.getToken();
        return token && !token.length ? true : false;
    }

    isAdministrator() {
        const token = this.getToken();
        if (!token && token === 'undefined') return false;

        const { role, ...rest } = this.jwtHelper.decodeToken(token);

        if (role === '2') return true;
        return false;
    }

    private validateToken(value: any) {
        return value && value.length ? true : false;
    }

    private getToken() {
        return localStorage.getItem('access_token') || '';
    }
}
