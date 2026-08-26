import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../app.configurator';
import { LayoutService } from '../../service/layout.service';
import { LoginApiService } from '../../../api/login/login.api.service';
import { BaseMainComponent } from '../../base/base-main.component';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PopoverModule } from 'primeng/popover';
import { AppMessageDialogComponent } from '../app.message-dialog/app.message-dialog.component';
import { AppNotificationDialogComponent } from '../app.notification-dialog/app.notification-dialog.component';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, AvatarModule, TooltipModule, DynamicDialogModule, AppMessageDialogComponent, AppNotificationDialogComponent, ConfirmDialogModule],
    templateUrl: './app.topbar.html',
    styleUrls: ['./app.topbar.scss'],
    providers: [DialogService, ConfirmationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppTopbar extends BaseMainComponent implements OnInit {
    @ViewChild(AppMessageDialogComponent) messageDialog!: AppMessageDialogComponent;
    @ViewChild(AppNotificationDialogComponent) notificationDialog!: AppNotificationDialogComponent;

    displayMessageDialog: boolean = false;

    ref: DynamicDialogRef | undefined;

    items!: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        public loginApiService: LoginApiService,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService,
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        super();
    }
    ngOnInit(): void {
        const popover = this.el.nativeElement.querySelector('p-popover');
        if (popover) {
            // Add a class dynamically to each popover
            this.renderer.addClass(popover, 'notification-popover');
        }
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    fnUsernameInitial() {
        const _user = this.userPayload?.name.split(' ') || '';
        if (_user && _user.length) {
            let _runnStr = '';

            for (let i = 0; i <= _user.length - 1; i++) {
                _runnStr += Array.from(_user[i])[0];
            }

            return _runnStr.toUpperCase();
        }

        return '';
    }

    openMessagePopover(event: Event) {
        if (this.messageDialog) {
            this.messageDialog.showPopover(event);
        } else {
            console.error('MessageDialogComponent is not initialized.');
        }
    }

    openNotificationPopover(event: Event) {
        if (this.notificationDialog) {
            this.notificationDialog.showPopover(event);
        } else {
            console.error('NotificationDialogComponent is not initialized.');
        }
    }

    confirmLogout(event: Event) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to logout?', // No target -> opens modal dialog
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.onLogout();
            },
            reject: () => {}
        });
    }

    onLogout() {
        this.loginApiService.onLogout();
    }
}
