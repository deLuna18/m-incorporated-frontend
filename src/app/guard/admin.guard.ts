import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserTypes } from '../enums/user-types';
import { User } from '../interface/user/user';

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const storedUser = localStorage.getItem('logged_user');
    const user = storedUser ? (JSON.parse(storedUser) as User) : undefined;

    if (user && Number(user.type) === UserTypes.Administrator) {
        return true;
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('logged_user');
    return router.createUrlTree(['/admin/login']);
};
