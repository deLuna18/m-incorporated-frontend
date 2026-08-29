import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { LoginApiService } from '../api/login/login.api.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const loginApiService = inject(LoginApiService);

    const loggedIn = loginApiService.isLoggedIn();

    if (loggedIn) return createUrlTreeFromSnapshot(route, ['/admin/dashboard']);
    return true;
};
