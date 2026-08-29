import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

type GalleryStatus = 'Published' | 'Draft';
interface GalleryItem { id: number; title: string; category: string; status: GalleryStatus; image: string; }

@Component({
    selector: 'app-gallery-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DialogModule, FormsModule, InputTextModule, SelectModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h1 class="m-0 text-3xl font-semibold">Gallery Management</h1><p class="mb-0 mt-2 text-muted-color">Organize the images displayed in the public gallery.</p></div><button pButton label="Add gallery item" icon="pi pi-plus" (click)="openNew()"></button></section>
        <div class="card">
            <div class="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div class="flex flex-col gap-3 sm:flex-row"><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search gallery" class="w-full" /></span><p-select [options]="filterOptions" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-40"></p-select></div><span class="text-sm text-muted-color">{{ filteredItems.length }} items</span></div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                @for (item of filteredItems; track item.id) {
                    <article class="overflow-hidden rounded-border border border-surface"><div class="relative aspect-[4/3] bg-surface-100"><img [src]="item.image" [alt]="item.title" class="h-full w-full object-cover" /><p-tag [value]="item.status" [severity]="item.status === 'Published' ? 'success' : 'warn'" styleClass="absolute right-3 top-3"></p-tag></div><div class="p-4"><div class="flex items-start justify-between gap-3"><div><h2 class="m-0 text-lg font-semibold">{{ item.title }}</h2><p class="mb-0 mt-1 text-sm text-muted-color">{{ item.category }}</p></div><div class="flex shrink-0"><button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded" (click)="edit(item)" aria-label="Edit item"></button><button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" (click)="remove(item)" aria-label="Delete item"></button></div></div></div></article>
                } @empty { <div class="col-span-full py-12 text-center text-muted-color">No gallery items match your search.</div> }
            </div>
        </div>
        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '34rem' }" [draggable]="false" [resizable]="false" [header]="editingId ? 'Edit gallery item' : 'Add gallery item'">
            <div class="flex flex-col gap-4 pt-2"><label class="flex flex-col gap-2"><span class="font-medium">Title</span><input pInputText [(ngModel)]="form.title" placeholder="e.g. Spring Campaign" /></label><label class="flex flex-col gap-2"><span class="font-medium">Category</span><input pInputText [(ngModel)]="form.category" placeholder="e.g. Editorial" /></label><label class="flex flex-col gap-2"><span class="font-medium">Image URL</span><input pInputText [(ngModel)]="form.image" placeholder="https://..." /></label><label class="flex flex-col gap-2"><span class="font-medium">Visibility</span><p-select [options]="statuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label></div>
            <ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Save item" icon="pi pi-check" [disabled]="!form.title.trim()" (click)="save()"></button></ng-template>
        </p-dialog>
    `,
    styles: `.search-field { position:relative; display:block; }.search-field > i { position:absolute; z-index:1; top:50%; left:1rem; transform:translateY(-50%); color:var(--text-color-secondary); }.search-field input { padding-left:2.75rem; }`
})
export class GalleryManagementComponent {
    searchTerm = '';
    statusFilter: GalleryStatus | 'All' = 'All';
    dialogVisible = false;
    editingId: number | null = null;
    form: GalleryItem = this.emptyItem();
    readonly statuses: { label: GalleryStatus; value: GalleryStatus }[] = [{ label: 'Published', value: 'Published' }, { label: 'Draft', value: 'Draft' }];
    readonly filterOptions: { label: string; value: GalleryStatus | 'All' }[] = [{ label: 'All statuses', value: 'All' }, ...this.statuses];
    items: GalleryItem[] = [
        { id: 1, title: 'Summer Editorial', category: 'Editorial', status: 'Published', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
        { id: 2, title: 'Studio Portraits', category: 'Portrait', status: 'Published', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85' },
        { id: 3, title: 'City Campaign', category: 'Commercial', status: 'Published', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85' },
        { id: 4, title: 'New Faces Test', category: 'Test Shoot', status: 'Draft', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85' },
        { id: 5, title: 'Milan Fashion Week', category: 'Runway', status: 'Published', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85' },
        { id: 6, title: 'Autumn Lookbook', category: 'Editorial', status: 'Draft', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85' }
    ];
    get filteredItems() { const query = this.searchTerm.trim().toLowerCase(); return this.items.filter((item) => (!query || `${item.title} ${item.category}`.toLowerCase().includes(query)) && (this.statusFilter === 'All' || item.status === this.statusFilter)); }
    openNew() { this.editingId = null; this.form = this.emptyItem(); this.dialogVisible = true; }
    edit(item: GalleryItem) { this.editingId = item.id; this.form = { ...item }; this.dialogVisible = true; }
    remove(item: GalleryItem) { if (confirm(`Delete ${item.title} from the gallery?`)) this.items = this.items.filter((entry) => entry.id !== item.id); }
    save() { const title = this.form.title.trim(); if (!title) return; const item = { ...this.form, title, image: this.form.image.trim() || this.emptyItem().image }; if (this.editingId) this.items = this.items.map((entry) => entry.id === this.editingId ? item : entry); else this.items = [...this.items, { ...item, id: Math.max(0, ...this.items.map((entry) => entry.id)) + 1 }]; this.dialogVisible = false; }
    private emptyItem(): GalleryItem { return { id: 0, title: '', category: '', status: 'Draft', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85' }; }
}
