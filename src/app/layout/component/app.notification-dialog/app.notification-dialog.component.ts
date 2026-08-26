import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'app-notification-dialog',
    imports: [Popover, CommonModule],
    templateUrl: './app.notification-dialog.component.html',
    styleUrl: './app.notification-dialog.component.scss'
})
export class AppNotificationDialogComponent {
    @ViewChild(Popover, { static: false }) popover!: Popover;

    notifications = [
        {
            title: 'New Message',
            description: 'You have a new message from John.',
            time: '2 mins ago'
        },
        {
            title: 'System Update',
            description: 'A system update is available.',
            time: '1 hour ago'
        },
        {
            title: 'Reminder',
            description: 'Meeting at 3 PM.',
            time: '3 hours ago'
        },
        {
            title: 'New Message',
            description: 'You have a new message from John.',
            time: '2 mins ago'
        },
        {
            title: 'System Update',
            description: 'A system update is available.',
            time: '1 hour ago'
        },
        {
            title: 'Reminder',
            description: 'Meeting at 3 PM.',
            time: '3 hours ago'
        },
        {
            title: 'New Message',
            description: 'You have a new message from John.',
            time: '2 mins ago'
        },
        {
            title: 'System Update',
            description: 'A system update is available.',
            time: '1 hour ago'
        },
        {
            title: 'Reminder',
            description: 'Meeting at 3 PM.',
            time: '3 hours ago'
        },
        {
            title: 'New Message',
            description: 'You have a new message from John.',
            time: '2 mins ago'
        },
        {
            title: 'System Update',
            description: 'A system update is available.',
            time: '1 hour ago'
        },
        {
            title: 'Reminder',
            description: 'Meeting at 3 PM.',
            time: '3 hours ago'
        }
    ];

    showPopover(event: Event) {
        if (this.popover) {
            (this.popover as any).toggle(event); // Ensure it's recognized
        } else {
            console.error('Popover reference is undefined.');
        }
    }
}
