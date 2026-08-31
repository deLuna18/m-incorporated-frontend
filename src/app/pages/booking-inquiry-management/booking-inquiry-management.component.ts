import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type BookingStatus = 'New' | 'Reviewing' | 'Quoted' | 'Confirmed' | 'Closed';

interface BookingInquiry {
    id: number;
    clientName: string;
    company: string;
    email: string;
    model: string;
    category: string;
    projectType: string;
    projectName: string;
    date: string;
    location: string;
    duration: string;
    budget: string;
    usage: string;
    details: string;
    attachments: string[];
    status: BookingStatus;
    receivedAt: string;
}

@Component({
    selector: 'app-booking-inquiry-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DatePipe, DialogModule, FormsModule, InputTextModule, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><h1 class="m-0 text-3xl font-semibold">Booking Inquiry Management</h1><p class="mb-0 mt-2 text-muted-color">Review booking briefs, supporting files, and client requirements in one place.</p></div>
            <span class="rounded-border border border-surface px-4 py-3 text-sm text-muted-color">Frontend review workspace</span>
        </section>

        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-6" aria-label="Booking status summary">
            @for (status of statuses; track status.value) {<div class="card mb-0"><span class="text-sm text-muted-color">{{ status.label }}</span><strong class="mt-2 block text-3xl">{{ count(status.value) }}</strong></div>}
        </section>

        <section class="card">
            <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex flex-col gap-3 sm:flex-row"><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search booking inquiries" class="w-full" /></span><p-select [options]="filterOptions" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-44"></p-select></div>
                <span class="text-sm text-muted-color">{{ filteredInquiries.length }} inquiries</span>
            </div>
            <p-table [value]="filteredInquiries" [rows]="8" [paginator]="true" responsiveLayout="scroll">
                <ng-template #header><tr><th>Client & project</th><th>Talent</th><th>Date & location</th><th>Budget</th><th>Status</th><th class="w-28">Action</th></tr></ng-template>
                <ng-template #body let-inquiry><tr>
                    <td><div class="font-medium">{{ inquiry.clientName }}</div><div class="mt-1 text-sm text-muted-color">{{ inquiry.projectName }} · {{ inquiry.projectType }}</div></td>
                    <td><div>{{ inquiry.model }}</div><div class="mt-1 text-sm text-muted-color">{{ inquiry.category }}</div></td>
                    <td><div>{{ inquiry.date | date: 'MMM d, y' }}</div><div class="mt-1 text-sm text-muted-color">{{ inquiry.location }}</div></td>
                    <td>{{ inquiry.budget || 'Not supplied' }}</td>
                    <td><p-tag [value]="inquiry.status" [severity]="severityFor(inquiry.status)"></p-tag></td>
                    <td><button pButton label="Review" icon="pi pi-eye" class="p-button-text" (click)="view(inquiry)"></button></td>
                </tr></ng-template>
                <ng-template #emptymessage><tr><td colspan="6" class="py-8 text-center text-muted-color">No booking inquiries match the current search or status.</td></tr></ng-template>
            </p-table>
        </section>

        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '52rem' }" [draggable]="false" [resizable]="false" header="Booking inquiry">
            @if (selected; as inquiry) {
                <div class="flex flex-col gap-6 pt-2">
                    <div class="flex flex-col gap-4 rounded-border bg-surface-50 p-4 sm:flex-row sm:items-start sm:justify-between dark:bg-surface-800">
                        <div><span class="text-sm text-muted-color">{{ inquiry.projectType }}</span><h2 class="mb-0 mt-1 text-xl font-semibold">{{ inquiry.projectName }}</h2><p class="mb-0 mt-2 text-sm text-muted-color">Received {{ inquiry.receivedAt | date: 'MMM d, y, h:mm a' }}</p></div>
                        <p-select [options]="statuses" [(ngModel)]="selected.status" optionLabel="label" optionValue="value" styleClass="w-40"></p-select>
                    </div>

                    <div class="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                        <div><span class="detail-label">CLIENT</span><p class="detail-value">{{ inquiry.clientName }}</p><a [href]="'mailto:' + inquiry.email" class="text-primary">{{ inquiry.email }}</a><p class="mb-0 mt-1 text-sm text-muted-color">{{ inquiry.company }}</p></div>
                        <div><span class="detail-label">TALENT</span><p class="detail-value">{{ inquiry.model }}</p><p class="mb-0 text-sm text-muted-color">{{ inquiry.category }}</p></div>
                        <div><span class="detail-label">DATE & DURATION</span><p class="detail-value">{{ inquiry.date | date: 'MMM d, y' }}</p><p class="mb-0 text-sm text-muted-color">{{ inquiry.duration }}</p></div>
                        <div><span class="detail-label">LOCATION & BUDGET</span><p class="detail-value">{{ inquiry.location }}</p><p class="mb-0 text-sm text-muted-color">{{ inquiry.budget || 'Budget not supplied' }}</p></div>
                        <div class="sm:col-span-2"><span class="detail-label">USAGE</span><p class="mb-0 mt-1 whitespace-pre-line leading-relaxed">{{ inquiry.usage || 'Not supplied' }}</p></div>
                        <div class="sm:col-span-2"><span class="detail-label">PROJECT DETAILS</span><p class="mb-0 mt-1 whitespace-pre-line leading-relaxed">{{ inquiry.details }}</p></div>
                    </div>

                    <div><span class="detail-label">SUPPORTING ATTACHMENTS</span><div class="mt-3 flex flex-wrap gap-2">@for (attachment of inquiry.attachments; track attachment) {<span class="attachment"><i class="pi pi-paperclip"></i>{{ attachment }}</span>} @empty {<span class="text-sm text-muted-color">No files attached.</span>}</div></div>
                </div>
            }
            <ng-template #footer><button pButton label="Close" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Save status" icon="pi pi-check" (click)="saveStatus()"></button></ng-template>
        </p-dialog>
    `,
    styles: `
        .search-field { position: relative; display: block; }
        .search-field > i { position: absolute; z-index: 1; top: 50%; left: 1rem; color: var(--text-color-secondary); transform: translateY(-50%); }
        .search-field input { padding-left: 2.75rem; }
        .detail-label { color: var(--text-color-secondary); display: block; font-size: .7rem; font-weight: 600; letter-spacing: .08em; }
        .detail-value { font-weight: 600; margin: .35rem 0 .1rem; }
        .attachment { align-items: center; background: var(--surface-100); border-radius: var(--content-border-radius); display: inline-flex; font-size: .82rem; gap: .45rem; padding: .5rem .7rem; }
        .dark .attachment { background: var(--surface-700); }
    `
})
export class BookingInquiryManagementComponent {
    searchTerm = '';
    statusFilter: BookingStatus | 'All' = 'All';
    dialogVisible = false;
    selected: BookingInquiry | null = null;

    readonly statuses: { label: BookingStatus; value: BookingStatus }[] = [
        { label: 'New', value: 'New' }, { label: 'Reviewing', value: 'Reviewing' }, { label: 'Quoted', value: 'Quoted' }, { label: 'Confirmed', value: 'Confirmed' }, { label: 'Closed', value: 'Closed' }
    ];
    readonly filterOptions: { label: string; value: BookingStatus | 'All' }[] = [{ label: 'All statuses', value: 'All' }, ...this.statuses];
    inquiries: BookingInquiry[] = [
        { id: 1, clientName: 'Ava Thompson', company: 'Edition Studio', email: 'ava@edition-studio.com', model: 'Luna Martinez', category: 'Women · Commercial', projectType: 'Editorial', projectName: 'Autumn 2026 Cover Story', date: '2026-10-14', location: 'Paris, France', duration: 'Full day', budget: '€6,000–8,000', usage: 'Print and digital editorial, worldwide, 12 months.', details: 'Studio and exterior editorial story with a small creative team. Please confirm Luna’s availability and travel requirements.', attachments: ['moodboard-autumn-2026.pdf', 'production-schedule.pdf'], status: 'New', receivedAt: '2026-08-31T09:30:00' },
        { id: 2, clientName: 'Marcus Lee', company: 'Northline Creative', email: 'marcus@northline.co', model: 'No preference', category: 'Men · Commercial', projectType: 'Campaign', projectName: 'Northline Essentials', date: '2026-09-22', location: 'New York, USA', duration: '2 days', budget: '$12,000', usage: 'Digital, social, e-commerce and OOH in North America for 6 months.', details: 'Looking for two male commercial models with confident movement and lifestyle experience.', attachments: ['northline-casting-brief.pdf'], status: 'Reviewing', receivedAt: '2026-08-30T14:15:00' },
        { id: 3, clientName: 'Sofia Williams', company: 'Maison 8', email: 'sofia@maison8.com', model: 'Camille Duval', category: 'Women · Editorial', projectType: 'Runway / Fashion Show', projectName: 'Maison 8 Resort Presentation', date: '2026-11-03', location: 'Milan, Italy', duration: 'Half day', budget: 'To be confirmed', usage: 'Live runway presentation and event social coverage.', details: 'Please share a rate and availability for fitting plus presentation day.', attachments: [], status: 'Quoted', receivedAt: '2026-08-28T11:45:00' },
        { id: 4, clientName: 'Daniel Kim', company: 'Kinetic House', email: 'daniel@kinetichouse.com', model: 'Kai Nakamura', category: 'Men · Creators', projectType: 'Social / Digital Content', projectName: 'City Motion Film', date: '2026-09-10', location: 'Seoul, South Korea', duration: '1 day', budget: '$4,500', usage: 'Organic social and paid digital advertising, Asia-Pacific, 3 months.', details: 'Vertical motion campaign for a technology brand. Talent must be comfortable with movement direction.', attachments: ['city-motion-reference.jpg'], status: 'Confirmed', receivedAt: '2026-08-25T16:20:00' }
    ];

    get filteredInquiries(): BookingInquiry[] {
        const query = this.searchTerm.trim().toLowerCase();
        return this.inquiries.filter((inquiry) => (!query || `${inquiry.clientName} ${inquiry.company} ${inquiry.model} ${inquiry.projectName}`.toLowerCase().includes(query)) && (this.statusFilter === 'All' || inquiry.status === this.statusFilter));
    }

    count(status: BookingStatus): number { return this.inquiries.filter((inquiry) => inquiry.status === status).length; }
    view(inquiry: BookingInquiry): void { this.selected = { ...inquiry, attachments: [...inquiry.attachments] }; this.dialogVisible = true; }
    saveStatus(): void {
        if (!this.selected) return;
        this.inquiries = this.inquiries.map((inquiry) => inquiry.id === this.selected!.id ? { ...this.selected!, attachments: [...this.selected!.attachments] } : inquiry);
        this.dialogVisible = false;
    }
    severityFor(status: BookingStatus): 'info' | 'warn' | 'success' | 'secondary' { return status === 'New' ? 'info' : status === 'Reviewing' || status === 'Quoted' ? 'warn' : status === 'Confirmed' ? 'success' : 'secondary'; }
}
