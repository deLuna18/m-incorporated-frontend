import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AuthDialogService } from './app/shared-component/auth-dialog.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, DialogModule],
    template: `
        <router-outlet></router-outlet>
        <p-dialog [(visible)]="dialogVisible" modal header="Session Expired" [closable]="false">
            <p>Your session has expired. Please log in again.</p>
            <button type="button" (click)="closeDialog()" class="px-6 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg focus:outline-none">
                <span>OK</span>
            </button>
        </p-dialog>
    `
})
export class AppComponent {
    dialogVisible = false;

    constructor(
        private authDialogService: AuthDialogService,
        private router: Router
    ) {
        this.authDialogService.dialogVisible$.subscribe((visible) => {
            this.dialogVisible = visible;
        });
    }

    closeDialog() {
        this.authDialogService.hideDialog();
        this.router.navigate(['/login']);
    }
}
