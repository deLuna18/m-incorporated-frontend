import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginApiService } from '../api/login/login.api.service';
import { AuthDialogService } from '../shared-component/auth-dialog.service';

export const authGuard: CanActivateFn = (route, state) => {
    const loginApiService = inject(LoginApiService);
    const authDialogService = inject(AuthDialogService);
    const router = inject(Router);

    const _token = localStorage.getItem('access_token') || '';
    if (!_token) {
        router.navigate(['admin/login']);
        return false;
    }

    const loggedIn = loginApiService.isLoggedIn();
    if (loggedIn) {
        return true;
    }

    authDialogService.showDialog();
    return false;
};
