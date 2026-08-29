import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ButtonModule, CommonModule, RouterLink, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 class="m-0 text-3xl font-semibold text-surface-900 dark:text-surface-0">Dashboard</h1>
                <p class="mb-0 mt-2 text-muted-color">Manage the content and customer activity across your website.</p>
            </div>
            <a pButton pRipple label="View public website" icon="pi pi-external-link" class="p-button-outlined" routerLink="/"></a>
        </section>

        <section class="grid grid-cols-12 gap-5">
            @for (stat of stats; track stat.label) {
                <article class="col-span-12 sm:col-span-6 xl:col-span-3">
                    <div class="card mb-0 h-full">
                        <div class="flex items-start justify-between">
                            <div><span class="block text-sm font-medium text-muted-color">{{ stat.label }}</span><strong class="mt-3 block text-3xl font-semibold text-surface-900 dark:text-surface-0">{{ stat.value }}</strong></div>
                            <span class="flex h-11 w-11 items-center justify-center rounded-full" [ngClass]="stat.iconBackground"><i [class]="stat.icon + ' text-xl ' + stat.iconColor"></i></span>
                        </div>
                        <p class="mb-0 mt-4 text-sm text-muted-color">{{ stat.description }}</p>
                    </div>
                </article>
            }

            <article class="col-span-12 xl:col-span-8">
                <div class="card h-full">
                    <div class="mb-6 flex items-center justify-between gap-4"><div><h2 class="m-0 text-xl font-semibold">Recent booking requests</h2><p class="mb-0 mt-1 text-sm text-muted-color">New requests will appear here when customers submit them.</p></div><p-tag value="0 pending" severity="secondary"></p-tag></div>
                    <div class="flex flex-col items-center justify-center rounded-border border border-dashed border-surface-300 px-6 py-12 text-center dark:border-surface-700"><span class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary dark:bg-primary-400/10"><i class="pi pi-calendar text-2xl"></i></span><h3 class="m-0 text-lg font-semibold">No booking requests yet</h3><p class="mb-0 mt-2 max-w-md text-sm text-muted-color">Customer booking submissions will be listed here for your review and follow-up.</p></div>
                </div>
            </article>

            <article class="col-span-12 xl:col-span-4">
                <div class="card h-full"><h2 class="m-0 text-xl font-semibold">Moderator checklist</h2><p class="mb-5 mt-1 text-sm text-muted-color">A quick overview of what needs attention.</p><ul class="m-0 list-none p-0">@for (item of checklist; track item.label; let last = $last) {<li class="flex items-center justify-between gap-3 py-4" [class.border-b]="!last" [class.border-surface]="!last"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300"><i [class]="item.icon"></i></span><span class="font-medium text-surface-900 dark:text-surface-0">{{ item.label }}</span></div><p-tag [value]="item.status" [severity]="item.severity"></p-tag></li>}</ul></div>
            </article>

            <article class="col-span-12"><div class="card mb-0"><div class="mb-5"><h2 class="m-0 text-xl font-semibold">Quick actions</h2><p class="mb-0 mt-1 text-sm text-muted-color">Preview the customer-facing experience.</p></div><div class="grid grid-cols-1 gap-3 md:grid-cols-3"><a routerLink="/models" class="quick-action"><i class="pi pi-users"></i><span><strong>Browse models</strong><small>Review the public directory</small></span><i class="pi pi-arrow-right ml-auto"></i></a><a routerLink="/gallery" class="quick-action"><i class="pi pi-images"></i><span><strong>Review gallery</strong><small>Open the public gallery</small></span><i class="pi pi-arrow-right ml-auto"></i></a><a routerLink="/booking" class="quick-action"><i class="pi pi-calendar"></i><span><strong>Check booking form</strong><small>Preview the customer flow</small></span><i class="pi pi-arrow-right ml-auto"></i></a></div></div></article>
        </section>
    `,
    styles: `.quick-action { display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid var(--surface-border); border-radius:var(--content-border-radius); color:inherit; transition:background-color .2s,border-color .2s; }.quick-action:hover { background:var(--surface-hover); border-color:var(--primary-color); }.quick-action > :first-child { color:var(--primary-color); font-size:1.25rem; }.quick-action span { display:flex; flex-direction:column; gap:.2rem; }.quick-action small { color:var(--text-color-secondary); }`
})
export class Dashboard {
    readonly stats = [
        { label: 'Booking requests', value: '0', description: 'Awaiting customer submissions', icon: 'pi pi-calendar', iconBackground: 'bg-blue-100 dark:bg-blue-400/10', iconColor: 'text-blue-500' },
        { label: 'Active models', value: '0', description: 'Models visible on the website', icon: 'pi pi-users', iconBackground: 'bg-purple-100 dark:bg-purple-400/10', iconColor: 'text-purple-500' },
        { label: 'Gallery items', value: '0', description: 'Published photos and media', icon: 'pi pi-images', iconBackground: 'bg-orange-100 dark:bg-orange-400/10', iconColor: 'text-orange-500' },
        { label: 'Unread messages', value: '0', description: 'Customer enquiries to review', icon: 'pi pi-envelope', iconBackground: 'bg-green-100 dark:bg-green-400/10', iconColor: 'text-green-500' }
    ];
    readonly checklist = [
        { label: 'Booking requests', status: 'All clear', severity: 'success' as const, icon: 'pi pi-check-circle' },
        { label: 'Customer messages', status: 'All clear', severity: 'success' as const, icon: 'pi pi-envelope' },
        { label: 'Website content', status: 'Ready', severity: 'info' as const, icon: 'pi pi-file-edit' }
    ];
}
