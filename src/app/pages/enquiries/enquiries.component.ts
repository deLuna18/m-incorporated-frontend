import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type EnquiryStatus = 'New' | 'In progress' | 'Resolved';
interface Enquiry { id: number; name: string; email: string; subject: string; message: string; status: EnquiryStatus; receivedAt: Date; }

@Component({
    selector: 'app-enquiries',
    standalone: true,
    imports: [ButtonModule, CommonModule, DatePipe, DialogModule, FormsModule, InputTextModule, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6"><h1 class="m-0 text-3xl font-semibold">Customer Enquiries</h1><p class="mb-0 mt-2 text-muted-color">Review and respond to messages submitted through the website.</p></section>
        <div class="grid grid-cols-12 gap-5 mb-6"><div class="col-span-12 md:col-span-4"><div class="card mb-0"><span class="text-sm text-muted-color">New enquiries</span><strong class="mt-2 block text-3xl">{{ count('New') }}</strong></div></div><div class="col-span-12 md:col-span-4"><div class="card mb-0"><span class="text-sm text-muted-color">In progress</span><strong class="mt-2 block text-3xl">{{ count('In progress') }}</strong></div></div><div class="col-span-12 md:col-span-4"><div class="card mb-0"><span class="text-sm text-muted-color">Resolved</span><strong class="mt-2 block text-3xl">{{ count('Resolved') }}</strong></div></div></div>
        <div class="card"><div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div class="flex flex-col gap-3 sm:flex-row"><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search enquiries" class="w-full" /></span><p-select [options]="filterOptions" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-44"></p-select></div><span class="text-sm text-muted-color">{{ filteredEnquiries.length }} messages</span></div>
            <p-table [value]="filteredEnquiries" [rows]="8" [paginator]="true" responsiveLayout="scroll"><ng-template #header><tr><th>Customer</th><th>Subject</th><th>Received</th><th>Status</th><th class="w-32">Actions</th></tr></ng-template><ng-template #body let-enquiry><tr><td><div class="font-medium">{{ enquiry.name }}</div><div class="mt-1 text-sm text-muted-color">{{ enquiry.email }}</div></td><td>{{ enquiry.subject }}</td><td>{{ enquiry.receivedAt | date: 'MMM d, y' }}</td><td><p-tag [value]="enquiry.status" [severity]="severityFor(enquiry.status)"></p-tag></td><td><button pButton label="View" icon="pi pi-eye" class="p-button-text" (click)="view(enquiry)"></button></td></tr></ng-template><ng-template #emptymessage><tr><td colspan="5" class="py-8 text-center text-muted-color">No enquiries match your search.</td></tr></ng-template></p-table>
        </div>
        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '38rem' }" [draggable]="false" [resizable]="false" header="Customer enquiry">@if (selected) {<div class="flex flex-col gap-5 pt-2"><div class="rounded-border bg-surface-50 p-4 dark:bg-surface-800"><div class="flex items-start justify-between gap-3"><div><h2 class="m-0 text-xl font-semibold">{{ selected.name }}</h2><a class="mt-1 block text-primary" [href]="'mailto:' + selected.email">{{ selected.email }}</a></div><p-tag [value]="selected.status" [severity]="severityFor(selected.status)"></p-tag></div><div class="mt-4 border-t border-surface pt-4"><span class="font-medium">{{ selected.subject }}</span><p class="mb-0 mt-2 whitespace-pre-line leading-relaxed text-muted-color">{{ selected.message }}</p></div></div><div><span class="text-sm text-muted-color">Received {{ selected.receivedAt | date: 'MMM d, y, h:mm a' }}</span></div></div>}<ng-template #footer><button pButton label="Close" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Mark in progress" class="p-button-outlined" [disabled]="!selected || selected.status !== 'New'" (click)="setStatus('In progress')"></button><button pButton label="Mark resolved" icon="pi pi-check" [disabled]="!selected || selected.status === 'Resolved'" (click)="setStatus('Resolved')"></button></ng-template></p-dialog>
    `,
    styles: `.search-field { position:relative; display:block; }.search-field > i { position:absolute; z-index:1; top:50%; left:1rem; transform:translateY(-50%); color:var(--text-color-secondary); }.search-field input { padding-left:2.75rem; }`
})
export class EnquiriesComponent {
    searchTerm = '';
    statusFilter: EnquiryStatus | 'All' = 'All';
    dialogVisible = false;
    selected: Enquiry | null = null;
    readonly filterOptions: { label: string; value: EnquiryStatus | 'All' }[] = [{ label: 'All statuses', value: 'All' }, { label: 'New', value: 'New' }, { label: 'In progress', value: 'In progress' }, { label: 'Resolved', value: 'Resolved' }];
    enquiries: Enquiry[] = [
        { id: 1, name: 'Ava Thompson', email: 'ava.thompson@example.com', subject: 'Editorial campaign booking', message: 'Hello, I would like to enquire about availability for an editorial campaign in October. Could you please share your booking process?', status: 'New', receivedAt: new Date('2026-08-27T09:30:00') },
        { id: 2, name: 'Marcus Lee', email: 'marcus.lee@example.com', subject: 'Model availability', message: 'We are producing a lifestyle campaign and would like recommendations from your commercial roster.', status: 'In progress', receivedAt: new Date('2026-08-26T14:15:00') },
        { id: 3, name: 'Sophia Williams', email: 'sophia.williams@example.com', subject: 'Portfolio submission', message: 'I am interested in representation and would like to know where I can send my portfolio.', status: 'New', receivedAt: new Date('2026-08-25T11:45:00') },
        { id: 4, name: 'Daniel Kim', email: 'daniel.kim@example.com', subject: 'Event appearance', message: 'Thank you for your assistance with our event booking.', status: 'Resolved', receivedAt: new Date('2026-08-23T16:20:00') }
    ];
    get filteredEnquiries() { const query = this.searchTerm.trim().toLowerCase(); return this.enquiries.filter((item) => (!query || `${item.name} ${item.email} ${item.subject}`.toLowerCase().includes(query)) && (this.statusFilter === 'All' || item.status === this.statusFilter)); }
    count(status: EnquiryStatus) { return this.enquiries.filter((item) => item.status === status).length; }
    view(enquiry: Enquiry) { this.selected = enquiry; this.dialogVisible = true; }
    setStatus(status: EnquiryStatus) { if (!this.selected) return; this.enquiries = this.enquiries.map((item) => item.id === this.selected!.id ? { ...item, status } : item); this.selected = { ...this.selected, status }; }
    severityFor(status: EnquiryStatus): 'info' | 'warn' | 'success' { return status === 'New' ? 'info' : status === 'In progress' ? 'warn' : 'success'; }
}
