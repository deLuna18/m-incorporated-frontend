import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

type AssetType = 'Image' | 'Video';
type AssetStatus = 'Visible' | 'Hidden';

interface MediaAsset {
    id: number;
    title: string;
    type: AssetType;
    category: string;
    alt: string;
    url: string;
    status: AssetStatus;
    usedBy: string;
}

@Component({
    selector: 'app-media-library',
    standalone: true,
    imports: [ButtonModule, CommonModule, DialogModule, FormsModule, InputTextModule, SelectModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><h1 class="m-0 text-3xl font-semibold">Media Library</h1><p class="mb-0 mt-2 text-muted-color">Organize reusable image and video assets for models, campaigns, pages, and the media gallery.</p></div>
            <button pButton label="Add media" icon="pi pi-upload" (click)="openNew()"></button>
        </section>

        <section class="card">
            <div class="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div class="flex flex-col gap-3 sm:flex-row"><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search media" class="w-full" /></span><p-select [options]="typeFilters" [(ngModel)]="typeFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-36"></p-select><p-select [options]="statusFilters" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-40"></p-select></div>
                <span class="text-sm text-muted-color">{{ filteredAssets.length }} assets · {{ count('Image') }} images · {{ count('Video') }} videos</span>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                @for (asset of filteredAssets; track asset.id) {
                    <article class="asset-card overflow-hidden rounded-border border border-surface">
                        <div class="relative aspect-[4/3] bg-surface-100">
                            @if (asset.type === 'Image') { <img [src]="asset.url" [alt]="asset.alt || asset.title" class="h-full w-full object-cover" /> }
                            @else { <div class="video-card"><i class="pi pi-play-circle text-4xl"></i><span>{{ asset.title }}</span></div> }
                            <div class="absolute left-3 top-3"><p-tag [value]="asset.type" [severity]="asset.type === 'Image' ? 'info' : 'warn'"></p-tag></div>
                            <div class="absolute right-3 top-3"><p-tag [value]="asset.status" [severity]="asset.status === 'Visible' ? 'success' : 'secondary'"></p-tag></div>
                        </div>
                        <div class="p-4"><div class="flex items-start justify-between gap-3"><div class="min-w-0"><h2 class="truncate text-base font-semibold">{{ asset.title }}</h2><p class="mb-0 mt-1 text-sm text-muted-color">{{ asset.category }} · {{ asset.usedBy }}</p></div><button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-sm" (click)="edit(asset)" [attr.aria-label]="'Edit ' + asset.title"></button></div><div class="mt-4 flex items-center justify-between gap-3"><button pButton [label]="asset.status === 'Visible' ? 'Hide' : 'Show'" [icon]="asset.status === 'Visible' ? 'pi pi-eye-slash' : 'pi pi-eye'" class="p-button-text p-button-sm" (click)="toggleStatus(asset)"></button><button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger p-button-sm" (click)="remove(asset)" [attr.aria-label]="'Delete ' + asset.title"></button></div></div>
                    </article>
                } @empty { <div class="col-span-full rounded-border border border-dashed border-surface p-12 text-center text-muted-color">No media assets match the current filters.</div> }
            </div>
        </section>

        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '40rem' }" [draggable]="false" [resizable]="false" [header]="editingId ? 'Edit media asset' : 'Add media asset'">
            <div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Asset title</span><input pInputText [(ngModel)]="form.title" placeholder="e.g. Autumn campaign cover" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Media type</span><p-select [options]="mediaTypes" [(ngModel)]="form.type" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Visibility</span><p-select [options]="mediaStatuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Category</span><input pInputText [(ngModel)]="form.category" placeholder="e.g. Campaign" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Used by</span><input pInputText [(ngModel)]="form.usedBy" placeholder="e.g. Gallery" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Alt text / media description</span><input pInputText [(ngModel)]="form.alt" placeholder="Describe the image or video for accessibility" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Media URL</span><input pInputText [(ngModel)]="form.url" placeholder="https://..." /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Or choose a local file</span><input type="file" accept="image/*,video/*" (change)="selectFile($event)" /></label>
                @if (selectedFileName) { <p class="sm:col-span-2 mb-0 text-sm text-muted-color"><i class="pi pi-paperclip mr-2"></i>{{ selectedFileName }}</p> }
            </div>
            <ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button><button pButton [label]="editingId ? 'Save changes' : 'Add media'" icon="pi pi-check" [disabled]="!form.title.trim()" (click)="save()"></button></ng-template>
        </p-dialog>
    `,
    styles: `
        .search-field { position: relative; display: block; }
        .search-field > i { position: absolute; z-index: 1; top: 50%; left: 1rem; color: var(--text-color-secondary); transform: translateY(-50%); }
        .search-field input { padding-left: 2.75rem; }
        .video-card { align-items: center; color: var(--text-color-secondary); display: flex; flex-direction: column; gap: .75rem; height: 100%; justify-content: center; padding: 1rem; text-align: center; }
    `
})
export class MediaLibraryComponent {
    searchTerm = '';
    typeFilter: AssetType | 'All' = 'All';
    statusFilter: AssetStatus | 'All' = 'All';
    dialogVisible = false;
    editingId: number | null = null;
    selectedFileName = '';
    form: MediaAsset = this.emptyAsset();
    readonly mediaTypes: { label: AssetType; value: AssetType }[] = [{ label: 'Image', value: 'Image' }, { label: 'Video', value: 'Video' }];
    readonly mediaStatuses: { label: AssetStatus; value: AssetStatus }[] = [{ label: 'Visible', value: 'Visible' }, { label: 'Hidden', value: 'Hidden' }];
    readonly typeFilters: { label: string; value: AssetType | 'All' }[] = [{ label: 'All media', value: 'All' }, ...this.mediaTypes];
    readonly statusFilters: { label: string; value: AssetStatus | 'All' }[] = [{ label: 'All visibility', value: 'All' }, ...this.mediaStatuses];
    assets: MediaAsset[] = [
        { id: 1, title: 'Summer editorial', type: 'Image', category: 'Editorial', alt: 'Model in a summer editorial look', url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85', status: 'Visible', usedBy: 'Gallery' },
        { id: 2, title: 'Luna motion reel', type: 'Video', category: 'Portfolio', alt: 'Luna Martinez motion reel', url: 'https://example.com/luna-motion-reel', status: 'Visible', usedBy: 'Luna Martinez' },
        { id: 3, title: 'Studio portrait set', type: 'Image', category: 'Portfolio', alt: 'Studio portrait of represented model', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85', status: 'Visible', usedBy: 'Model profiles' },
        { id: 4, title: 'Campaign film select', type: 'Video', category: 'Campaign', alt: 'Campaign film still and motion reference', url: 'https://example.com/campaign-film', status: 'Hidden', usedBy: 'Media Gallery' },
        { id: 5, title: 'Milan runway', type: 'Image', category: 'Runway', alt: 'Model walking a Milan runway', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85', status: 'Visible', usedBy: 'Gallery' }
    ];

    get filteredAssets(): MediaAsset[] {
        const query = this.searchTerm.trim().toLowerCase();
        return this.assets.filter((asset) => (!query || `${asset.title} ${asset.category} ${asset.usedBy}`.toLowerCase().includes(query)) && (this.typeFilter === 'All' || asset.type === this.typeFilter) && (this.statusFilter === 'All' || asset.status === this.statusFilter));
    }

    count(type: AssetType): number { return this.assets.filter((asset) => asset.type === type).length; }
    openNew(): void { this.editingId = null; this.selectedFileName = ''; this.form = this.emptyAsset(); this.dialogVisible = true; }
    edit(asset: MediaAsset): void { this.editingId = asset.id; this.selectedFileName = ''; this.form = { ...asset }; this.dialogVisible = true; }
    selectFile(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        this.selectedFileName = file.name;
        this.form.url = URL.createObjectURL(file);
        this.form.type = file.type.startsWith('video/') ? 'Video' : 'Image';
    }
    save(): void {
        const title = this.form.title.trim();
        if (!title) return;
        const asset = { ...this.form, title, category: this.form.category.trim() || 'Uncategorized', usedBy: this.form.usedBy.trim() || 'Unassigned', alt: this.form.alt.trim() || title, url: this.form.url.trim() || this.emptyAsset().url };
        this.assets = this.editingId ? this.assets.map((item) => item.id === this.editingId ? asset : item) : [...this.assets, { ...asset, id: Math.max(0, ...this.assets.map((item) => item.id)) + 1 }];
        this.dialogVisible = false;
    }
    toggleStatus(asset: MediaAsset): void { asset.status = asset.status === 'Visible' ? 'Hidden' : 'Visible'; }
    remove(asset: MediaAsset): void { if (confirm(`Delete “${asset.title}” from the media library?`)) this.assets = this.assets.filter((item) => item.id !== asset.id); }
    private emptyAsset(): MediaAsset { return { id: 0, title: '', type: 'Image', category: '', alt: '', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85', status: 'Visible', usedBy: '' }; }
}
