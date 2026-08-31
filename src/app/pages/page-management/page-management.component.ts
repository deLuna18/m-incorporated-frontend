import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type PageStatus = 'Published' | 'Draft';

interface ManagedPage {
    id: number;
    name: string;
    path: string;
    sections: number;
    status: PageStatus;
    updatedAt: string;
    eyebrow: string;
    heading: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
}

@Component({
    selector: 'app-page-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DatePipe, DialogModule, FormsModule, InputTextModule, RouterLink, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 class="m-0 text-3xl font-semibold">Page Management</h1>
                <p class="mb-0 mt-2 text-muted-color">Review the public website pages and prepare their editorial content for publishing.</p>
            </div>
            <a pButton label="View public site" icon="pi pi-external-link" class="p-button-outlined" routerLink="/"></a>
        </section>

        <section class="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6" aria-label="Page summary">
            <div class="card mb-0"><span class="text-sm text-muted-color">Public pages</span><strong class="mt-2 block text-3xl">{{ pages.length }}</strong></div>
            <div class="card mb-0"><span class="text-sm text-muted-color">Published</span><strong class="mt-2 block text-3xl">{{ count('Published') }}</strong></div>
            <div class="card mb-0"><span class="text-sm text-muted-color">Draft changes</span><strong class="mt-2 block text-3xl">{{ count('Draft') }}</strong></div>
        </section>

        <section class="card">
            <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex flex-col gap-3 sm:flex-row">
                    <span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search pages" class="w-full" /></span>
                    <p-select [options]="filterOptions" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-40"></p-select>
                </div>
                <span class="text-sm text-muted-color">{{ filteredPages.length }} pages</span>
            </div>

            <p-table [value]="filteredPages" [rows]="9" [paginator]="true" responsiveLayout="scroll">
                <ng-template #header><tr><th pSortableColumn="name">Page <p-sortIcon field="name"></p-sortIcon></th><th>URL</th><th>Sections</th><th pSortableColumn="updatedAt">Last updated <p-sortIcon field="updatedAt"></p-sortIcon></th><th>Status</th><th class="w-40">Actions</th></tr></ng-template>
                <ng-template #body let-page>
                    <tr>
                        <td><div class="font-medium">{{ page.name }}</div><div class="mt-1 text-sm text-muted-color">{{ page.heading }}</div></td>
                        <td><code>{{ page.path }}</code></td>
                        <td>{{ page.sections }}</td>
                        <td>{{ page.updatedAt | date: 'MMM d, y' }}</td>
                        <td><p-tag [value]="page.status" [severity]="page.status === 'Published' ? 'success' : 'warn'"></p-tag></td>
                        <td>
                            <a pButton icon="pi pi-external-link" class="p-button-text p-button-rounded" [routerLink]="page.path" [attr.aria-label]="'Preview ' + page.name"></a>
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded" (click)="edit(page)" [attr.aria-label]="'Edit ' + page.name"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage><tr><td colspan="6" class="py-8 text-center text-muted-color">No pages match the current search or status.</td></tr></ng-template>
            </p-table>
        </section>

        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '48rem' }" [draggable]="false" [resizable]="false" [header]="'Edit ' + form.name">
            <div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div class="sm:col-span-2 rounded-border bg-surface-50 p-4 dark:bg-surface-800"><span class="text-sm text-muted-color">Public URL</span><div class="mt-1 font-medium">{{ form.path }}</div></div>
                <label class="flex flex-col gap-2"><span class="font-medium">Page status</span><p-select [options]="statuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Hero eyebrow</span><input pInputText [(ngModel)]="form.eyebrow" placeholder="e.g. M Incorporated" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Hero heading</span><input pInputText [(ngModel)]="form.heading" placeholder="Page headline" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Introductory copy</span><textarea [(ngModel)]="form.description" rows="4" class="w-full resize-y p-3" placeholder="Short supporting page copy."></textarea></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">SEO title</span><input pInputText [(ngModel)]="form.metaTitle" placeholder="Page title for search engines" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">SEO description</span><textarea [(ngModel)]="form.metaDescription" rows="3" class="w-full resize-y p-3" placeholder="Concise page summary for search engines."></textarea></label>
            </div>
            <ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Save page" icon="pi pi-check" (click)="save()"></button></ng-template>
        </p-dialog>
    `,
    styles: `
        .search-field { position: relative; display: block; }
        .search-field > i { position: absolute; z-index: 1; top: 50%; left: 1rem; color: var(--text-color-secondary); transform: translateY(-50%); }
        .search-field input { padding-left: 2.75rem; }
        code { color: var(--text-color-secondary); font-size: .82rem; }
        textarea { border: 1px solid var(--surface-border); border-radius: var(--content-border-radius); color: var(--text-color); font: inherit; }
        textarea:focus { border-color: var(--primary-color); outline: 0; }
    `
})
export class PageManagementComponent {
    searchTerm = '';
    statusFilter: PageStatus | 'All' = 'All';
    dialogVisible = false;
    form: ManagedPage = this.emptyPage();

    readonly statuses: { label: PageStatus; value: PageStatus }[] = [{ label: 'Published', value: 'Published' }, { label: 'Draft', value: 'Draft' }];
    readonly filterOptions: { label: string; value: PageStatus | 'All' }[] = [{ label: 'All statuses', value: 'All' }, ...this.statuses];
    pages: ManagedPage[] = [
        { id: 1, name: 'Home', path: '/', sections: 10, status: 'Published', updatedAt: '2026-08-28', eyebrow: 'M Incorporated', heading: 'Model management with a global point of view.', description: 'A curated introduction to the agency, its roster, and client services.', metaTitle: 'M Incorporated | Model Management', metaDescription: 'International model management for fashion, culture, and creative industries.' },
        { id: 2, name: 'Models', path: '/models', sections: 3, status: 'Published', updatedAt: '2026-08-27', eyebrow: 'The roster', heading: 'Discover the faces shaping what comes next.', description: 'Browse represented talent by category and location.', metaTitle: 'Models | M Incorporated', metaDescription: 'Explore the M Incorporated model roster.' },
        { id: 3, name: 'Services', path: '/services', sections: 6, status: 'Published', updatedAt: '2026-08-30', eyebrow: 'Our services', heading: 'Representation that moves careers forward.', description: 'Agency services for talent, clients, and creative partners.', metaTitle: 'Services | M Incorporated', metaDescription: 'Model management, casting, and booking services.' },
        { id: 4, name: 'About', path: '/about', sections: 9, status: 'Published', updatedAt: '2026-08-29', eyebrow: 'About M Incorporated', heading: 'More than representation.', description: 'The agency story, philosophy, and global network.', metaTitle: 'About | M Incorporated', metaDescription: 'Learn about the M Incorporated agency and point of view.' },
        { id: 5, name: 'Media Gallery', path: '/gallery', sections: 8, status: 'Published', updatedAt: '2026-08-30', eyebrow: 'Media gallery', heading: 'Still. Motion. Presence.', description: 'A curated visual archive of campaigns, editorials, and process.', metaTitle: 'Media Gallery | M Incorporated', metaDescription: 'Explore the M Incorporated media archive.' },
        { id: 6, name: 'Journal', path: '/blog', sections: 4, status: 'Published', updatedAt: '2026-08-31', eyebrow: 'M Incorporated blog', heading: 'Stories from the agency.', description: 'News, talent stories, and editorial perspectives.', metaTitle: 'Journal | M Incorporated', metaDescription: 'News and editorial stories from M Incorporated.' },
        { id: 7, name: 'Booking Inquiry', path: '/booking', sections: 5, status: 'Published', updatedAt: '2026-08-28', eyebrow: 'Booking inquiry', heading: 'Tell us about the project.', description: 'Start a model booking inquiry with the agency team.', metaTitle: 'Book a Model | M Incorporated', metaDescription: 'Submit a booking inquiry to M Incorporated.' },
        { id: 8, name: 'Contact', path: '/contact', sections: 2, status: 'Published', updatedAt: '2026-08-28', eyebrow: 'Contact us', heading: 'Start a conversation.', description: 'Get in touch with the M Incorporated team.', metaTitle: 'Contact | M Incorporated', metaDescription: 'Contact M Incorporated for bookings and enquiries.' }
    ];

    get filteredPages(): ManagedPage[] {
        const query = this.searchTerm.trim().toLowerCase();
        return this.pages.filter((page) => (!query || `${page.name} ${page.path} ${page.heading}`.toLowerCase().includes(query)) && (this.statusFilter === 'All' || page.status === this.statusFilter));
    }

    count(status: PageStatus): number { return this.pages.filter((page) => page.status === status).length; }
    edit(page: ManagedPage): void { this.form = { ...page }; this.dialogVisible = true; }
    save(): void {
        this.pages = this.pages.map((page) => page.id === this.form.id ? { ...this.form, updatedAt: new Date().toISOString().slice(0, 10) } : page);
        this.dialogVisible = false;
    }

    private emptyPage(): ManagedPage {
        return { id: 0, name: '', path: '', sections: 0, status: 'Draft', updatedAt: '', eyebrow: '', heading: '', description: '', metaTitle: '', metaDescription: '' };
    }
}
