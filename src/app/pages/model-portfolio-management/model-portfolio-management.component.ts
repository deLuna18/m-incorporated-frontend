import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

type MediaType = 'Image' | 'Video';
type MediaStatus = 'Visible' | 'Hidden';

interface PortfolioMedia {
    id: number;
    title: string;
    type: MediaType;
    url: string;
    status: MediaStatus;
}

interface PortfolioModel {
    id: number;
    name: string;
    location: string;
    category: string;
    image: string;
    bio: string;
    height: string;
    measurements: string;
    media: PortfolioMedia[];
}

@Component({
    selector: 'app-model-portfolio-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DialogModule, FormsModule, InputTextModule, SelectModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><h1 class="m-0 text-3xl font-semibold">Model Portfolio & Video</h1><p class="mb-0 mt-2 text-muted-color">Manage profile details, selected images, motion reels, visibility, and public portfolio order.</p></div>
            <button pButton label="Edit profile details" icon="pi pi-user-edit" class="p-button-outlined" (click)="profileDialogVisible = true"></button>
        </section>

        <section class="card mb-6">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center"><span class="font-medium">Selected model</span><p-select [options]="modelOptions" [(ngModel)]="selectedId" optionLabel="label" optionValue="value" styleClass="w-full sm:w-72" (onChange)="selectModel()"></p-select></div>
                <div class="flex flex-wrap gap-3"><button pButton label="Add image" icon="pi pi-image" class="p-button-outlined" (click)="openMedia('Image')"></button><button pButton label="Add video" icon="pi pi-video" (click)="openMedia('Video')"></button></div>
            </div>
        </section>

        @if (selected; as model) {
            <section class="grid grid-cols-1 gap-5 xl:grid-cols-[20rem_1fr]">
                <aside class="card mb-0 h-fit">
                    <img [src]="model.image" [alt]="model.name" class="model-image aspect-[4/5] w-full object-cover" />
                    <div class="pt-5"><h2 class="m-0 text-2xl font-semibold">{{ model.name }}</h2><p class="mb-0 mt-1 text-muted-color">{{ model.location }} · {{ model.category }}</p></div>
                    <div class="mt-5 grid grid-cols-2 gap-4 border-t border-surface pt-5"><div><span class="metric-label">HEIGHT</span><strong class="mt-1 block">{{ model.height }}</strong></div><div><span class="metric-label">MEASUREMENTS</span><strong class="mt-1 block">{{ model.measurements }}</strong></div></div>
                    <p class="mb-0 mt-5 border-t border-surface pt-5 text-sm leading-relaxed text-muted-color">{{ model.bio }}</p>
                </aside>

                <section class="card mb-0">
                    <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h2 class="m-0 text-xl font-semibold">Public portfolio</h2><p class="mb-0 mt-1 text-sm text-muted-color">Order determines how images and motion references appear on the model profile.</p></div><span class="text-sm text-muted-color">{{ model.media.length }} media items</span></div>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        @for (item of model.media; track item.id; let index = $index) {
                            <article class="media-card overflow-hidden rounded-border border border-surface">
                                <div class="relative aspect-[4/3] bg-surface-100">
                                    @if (item.type === 'Image') { <img [src]="item.url" [alt]="item.title" class="h-full w-full object-cover" /> }
                                    @else { <div class="video-placeholder"><i class="pi pi-play-circle text-4xl"></i><span>{{ item.title }}</span></div> }
                                    <p-tag [value]="item.status" [severity]="item.status === 'Visible' ? 'success' : 'secondary'" styleClass="absolute right-3 top-3"></p-tag>
                                </div>
                                <div class="p-4"><div class="flex items-start justify-between gap-3"><div><span class="text-sm text-muted-color">{{ index + 1 | number: '2.0-0' }} · {{ item.type }}</span><h3 class="mb-0 mt-1 text-base font-semibold">{{ item.title }}</h3></div><div class="flex shrink-0"><button pButton icon="pi pi-arrow-up" class="p-button-text p-button-rounded" [disabled]="index === 0" (click)="move(index, -1)" aria-label="Move media up"></button><button pButton icon="pi pi-arrow-down" class="p-button-text p-button-rounded" [disabled]="index === model.media.length - 1" (click)="move(index, 1)" aria-label="Move media down"></button></div></div><div class="mt-4 flex items-center justify-between gap-3"><button pButton [label]="item.status === 'Visible' ? 'Hide' : 'Show'" [icon]="item.status === 'Visible' ? 'pi pi-eye-slash' : 'pi pi-eye'" class="p-button-text p-button-sm" (click)="toggleStatus(item)"></button><button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger p-button-sm" (click)="remove(item)" [attr.aria-label]="'Delete ' + item.title"></button></div></div>
                            </article>
                        } @empty { <div class="col-span-full rounded-border border border-dashed border-surface p-10 text-center text-muted-color">No portfolio media has been added for this model.</div> }
                    </div>
                </section>
            </section>
        }

        <p-dialog [(visible)]="mediaDialogVisible" [modal]="true" [style]="{ width: '36rem' }" [draggable]="false" [resizable]="false" [header]="'Add ' + mediaForm.type.toLowerCase() + ' reference'">
            <div class="flex flex-col gap-4 pt-2"><label class="flex flex-col gap-2"><span class="font-medium">Media type</span><p-select [options]="mediaTypes" [(ngModel)]="mediaForm.type" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label><label class="flex flex-col gap-2"><span class="font-medium">Title</span><input pInputText [(ngModel)]="mediaForm.title" placeholder="e.g. Spring campaign portrait" /></label><label class="flex flex-col gap-2"><span class="font-medium">{{ mediaForm.type === 'Image' ? 'Image URL' : 'Video URL / reel reference' }}</span><input pInputText [(ngModel)]="mediaForm.url" placeholder="https://..." /></label><label class="flex flex-col gap-2"><span class="font-medium">Visibility</span><p-select [options]="mediaStatuses" [(ngModel)]="mediaForm.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label></div>
            <ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="mediaDialogVisible = false"></button><button pButton label="Add to portfolio" icon="pi pi-check" [disabled]="!mediaForm.title.trim()" (click)="addMedia()"></button></ng-template>
        </p-dialog>

        <p-dialog [(visible)]="profileDialogVisible" [modal]="true" [style]="{ width: '42rem' }" [draggable]="false" [resizable]="false" [header]="'Edit ' + (selected?.name ?? 'model')">
            @if (selected; as model) {<div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2"><label class="flex flex-col gap-2"><span class="font-medium">Height</span><input pInputText [(ngModel)]="model.height" placeholder="e.g. 179 cm" /></label><label class="flex flex-col gap-2"><span class="font-medium">Measurements</span><input pInputText [(ngModel)]="model.measurements" placeholder="e.g. 82 / 60 / 89" /></label><label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Profile bio</span><textarea [(ngModel)]="model.bio" rows="5" class="w-full resize-y p-3"></textarea></label></div>}
            <ng-template #footer><button pButton label="Close" icon="pi pi-check" (click)="profileDialogVisible = false"></button></ng-template>
        </p-dialog>
    `,
    styles: `
        .model-image { border-radius: var(--content-border-radius); }
        .metric-label { color: var(--text-color-secondary); font-size: .68rem; font-weight: 600; letter-spacing: .08em; }
        .video-placeholder { align-items: center; color: var(--text-color-secondary); display: flex; flex-direction: column; gap: .75rem; height: 100%; justify-content: center; padding: 1rem; text-align: center; }
        textarea { border: 1px solid var(--surface-border); border-radius: var(--content-border-radius); color: var(--text-color); font: inherit; }
        textarea:focus { border-color: var(--primary-color); outline: 0; }
    `
})
export class ModelPortfolioManagementComponent {
    selectedId = 1;
    mediaDialogVisible = false;
    profileDialogVisible = false;
    mediaForm: PortfolioMedia = this.emptyMedia();
    readonly mediaTypes: { label: MediaType; value: MediaType }[] = [{ label: 'Image', value: 'Image' }, { label: 'Video', value: 'Video' }];
    readonly mediaStatuses: { label: MediaStatus; value: MediaStatus }[] = [{ label: 'Visible', value: 'Visible' }, { label: 'Hidden', value: 'Hidden' }];
    models: PortfolioModel[] = [
        { id: 1, name: 'Luna Martinez', location: 'New York', category: 'Women · Commercial', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85', bio: 'Luna brings a refined, contemporary presence to editorial, commercial, and beauty work worldwide.', height: '179 cm', measurements: '82 / 60 / 89', media: [
            { id: 1, title: 'Studio portrait', type: 'Image', status: 'Visible', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43?auto=format&fit=crop&w=800&q=85' },
            { id: 2, title: 'Editorial movement', type: 'Video', status: 'Visible', url: 'https://example.com/luna-editorial-reel' },
            { id: 3, title: 'Campaign close-up', type: 'Image', status: 'Visible', url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85' }
        ] },
        { id: 2, name: 'Noah Valentino', location: 'Milan', category: 'Men · Editorial', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85', bio: 'Noah works across fashion, runway, and global campaign projects.', height: '187 cm', measurements: '99 / 79 / 96', media: [{ id: 4, title: 'Milan test', type: 'Image', status: 'Visible', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85' }] },
        { id: 3, name: 'Camille Duval', location: 'Paris', category: 'Women · Editorial', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=85', bio: 'Camille is a Paris-based model with a distinctive editorial point of view.', height: '177 cm', measurements: '80 / 59 / 87', media: [] }
    ];

    get selected(): PortfolioModel | undefined { return this.models.find((model) => model.id === this.selectedId); }
    get modelOptions(): { label: string; value: number }[] { return this.models.map((model) => ({ label: `${model.name} · ${model.location}`, value: model.id })); }
    selectModel(): void { this.mediaDialogVisible = false; this.profileDialogVisible = false; }
    openMedia(type: MediaType): void { this.mediaForm = { ...this.emptyMedia(), type }; this.mediaDialogVisible = true; }
    addMedia(): void {
        const model = this.selected;
        if (!model || !this.mediaForm.title.trim()) return;
        model.media = [...model.media, { ...this.mediaForm, id: Math.max(0, ...this.models.flatMap((item) => item.media.map((media) => media.id))) + 1, title: this.mediaForm.title.trim(), url: this.mediaForm.url.trim() || this.emptyMedia().url }];
        this.mediaDialogVisible = false;
    }
    move(index: number, direction: -1 | 1): void {
        const media = this.selected?.media;
        const destination = index + direction;
        if (!media || destination < 0 || destination >= media.length) return;
        [media[index], media[destination]] = [media[destination], media[index]];
    }
    toggleStatus(item: PortfolioMedia): void { item.status = item.status === 'Visible' ? 'Hidden' : 'Visible'; }
    remove(item: PortfolioMedia): void { if (confirm(`Remove “${item.title}” from this portfolio?`)) { const model = this.selected; if (model) model.media = model.media.filter((media) => media.id !== item.id); } }
    private emptyMedia(): PortfolioMedia { return { id: 0, title: '', type: 'Image', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85', status: 'Visible' }; }
}
