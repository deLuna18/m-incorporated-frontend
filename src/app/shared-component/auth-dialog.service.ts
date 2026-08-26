import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthDialogService {
    private dialogVisible = new BehaviorSubject<boolean>(false);
    dialogVisible$ = this.dialogVisible.asObservable();

    showDialog() {
        this.dialogVisible.next(true);
    }

    hideDialog() {
        this.dialogVisible.next(false);
    }
}
