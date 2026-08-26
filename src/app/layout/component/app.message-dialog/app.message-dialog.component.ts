import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'app-message-dialog',
    standalone: true,
    imports: [Popover, CommonModule],
    templateUrl: './app.message-dialog.component.html',
    styleUrl: './app.message-dialog.component.scss'
})
export class AppMessageDialogComponent {
    @ViewChild(Popover, { static: false }) popover!: Popover;

    messages = [
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
            sender: 'Amy Elsner',
            time: '10:30 AM',
            text: 'Hey, did you check the latest report?'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            sender: 'Anna Fali',
            time: '10:45 AM',
            text: 'Yes, I just saw it. Looks great!'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
            sender: 'Asiya Javayant',
            time: '11:00 AM',
            text: 'We might need some revisions on the budget section.'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
            sender: 'Amy Elsner',
            time: '10:30 AM',
            text: 'Hey, did you check the latest report?'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            sender: 'Anna Fali',
            time: '10:45 AM',
            text: 'Yes, I just saw it. Looks great!'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
            sender: 'Asiya Javayant',
            time: '11:00 AM',
            text: 'We might need some revisions on the budget section.'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
            sender: 'Amy Elsner',
            time: '10:30 AM',
            text: 'Hey, did you check the latest report?'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            sender: 'Anna Fali',
            time: '10:45 AM',
            text: 'Yes, I just saw it. Looks great!'
        },
        {
            avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
            sender: 'Asiya Javayant',
            time: '11:00 AM',
            text: 'We might need some revisions on the budget section.'
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
