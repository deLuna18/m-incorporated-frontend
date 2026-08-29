import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type ModelStatus = 'Active' | 'Draft' | 'Inactive';

interface ManagedModel {
    id: number;
    name: string;
    location: string;
    category: string;
    status: ModelStatus;
    featured: boolean;
}

@Component({
    selector: 'app-model-management',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, CommonModule, DialogModule, FormsModule, InputTextModule, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><h1 class="m-0 text-3xl font-semibold">Model Management</h1><p class="mb-0 mt-2 text-muted-color">Create, update, and control the models shown in your public roster.</p></div>
            <button pButton label="Add model" icon="pi pi-plus" (click)="openNew()"></button>
        </section>

        <div class="card">
            <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span class="font-semibold text-xl">Model roster <span class="ml-2 text-base font-normal text-muted-color">({{ filteredModels.length }})</span></span><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search models" class="w-full" /></span></div>
            <p-table [value]="filteredModels" [rows]="8" [paginator]="true" responsiveLayout="scroll">
                <ng-template #header><tr><th pSortableColumn="name">Model <p-sortIcon field="name"></p-sortIcon></th><th pSortableColumn="location">Location <p-sortIcon field="location"></p-sortIcon></th><th>Category</th><th>Status</th><th>Featured</th><th class="w-28">Actions</th></tr></ng-template>
                <ng-template #body let-model><tr><td><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary dark:bg-primary-400/10">{{ initials(model.name) }}</span><span class="font-medium">{{ model.name }}</span></div></td><td>{{ model.location }}</td><td>{{ model.category }}</td><td><p-tag [value]="model.status" [severity]="severityFor(model.status)"></p-tag></td><td><i [class]="model.featured ? 'pi pi-star-fill text-yellow-500' : 'pi pi-star text-muted-color'"></i></td><td><button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded" (click)="edit(model)" aria-label="Edit model"></button><button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" (click)="remove(model)" aria-label="Delete model"></button></td></tr></ng-template>
                <ng-template #emptymessage><tr><td colspan="6" class="py-8 text-center text-muted-color">No models match your search.</td></tr></ng-template>
            </p-table>
        </div>

        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '34rem' }" [draggable]="false" [resizable]="false" [header]="editingId ? 'Edit model' : 'Add model'">
            <div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Model name</span><input pInputText [(ngModel)]="form.name" placeholder="e.g. Luna Martinez" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Location</span><input pInputText [(ngModel)]="form.location" placeholder="e.g. New York" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Category</span><input pInputText [(ngModel)]="form.category" placeholder="e.g. Women · Commercial" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Status</span><p-select [options]="statuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label>
                <div class="flex items-end"><p-checkbox [(ngModel)]="form.featured" [binary]="true" inputId="featured"></p-checkbox><label for="featured" class="ml-2">Feature this model</label></div>
            </div>
            <ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Save model" icon="pi pi-check" [disabled]="!form.name.trim()" (click)="save()"></button></ng-template>
        </p-dialog>
    `,
    styles: `.search-field { position:relative; display:block; }.search-field > i { position:absolute; z-index:1; top:50%; left:1rem; transform:translateY(-50%); color:var(--text-color-secondary); }.search-field input { padding-left:2.75rem; }`
})
export class ModelManagementComponent {
    searchTerm = '';
    dialogVisible = false;
    editingId: number | null = null;
    form: ManagedModel = this.emptyModel();
    readonly statuses: { label: ModelStatus; value: ModelStatus }[] = [{ label: 'Active', value: 'Active' }, { label: 'Draft', value: 'Draft' }, { label: 'Inactive', value: 'Inactive' }];
    models: ManagedModel[] = [
        { id: 1, name: 'Luna Martinez', location: 'New York', category: 'Women · Commercial', status: 'Active', featured: true },
        { id: 2, name: 'Noah Valentino', location: 'Milan', category: 'Men', status: 'Active', featured: true },
        { id: 3, name: 'Ella Roberts', location: 'Paris', category: 'Women · Commercial', status: 'Active', featured: true },
        { id: 4, name: 'Kai Okafor', location: 'London', category: 'Men · Creators', status: 'Draft', featured: false },
        { id: 5, name: 'Maya Collins', location: 'New York', category: 'Women · New Face', status: 'Inactive', featured: false }
    ];

    get filteredModels() {
        const query = this.searchTerm.trim().toLowerCase();
        return !query ? this.models : this.models.filter((model) => `${model.name} ${model.location} ${model.category}`.toLowerCase().includes(query));
    }

    openNew() { this.editingId = null; this.form = this.emptyModel(); this.dialogVisible = true; }
    edit(model: ManagedModel) { this.editingId = model.id; this.form = { ...model }; this.dialogVisible = true; }
    remove(model: ManagedModel) { if (confirm(`Remove ${model.name} from the roster?`)) this.models = this.models.filter((item) => item.id !== model.id); }
    save() { const name = this.form.name.trim(); if (!name) return; const model = { ...this.form, name }; if (this.editingId) this.models = this.models.map((item) => item.id === this.editingId ? model : item); else this.models = [...this.models, { ...model, id: Math.max(0, ...this.models.map((item) => item.id)) + 1 }]; this.dialogVisible = false; }
    initials(name: string) { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); }
    severityFor(status: ModelStatus): 'success' | 'warn' | 'secondary' { return status === 'Active' ? 'success' : status === 'Draft' ? 'warn' : 'secondary'; }
    private emptyModel(): ManagedModel { return { id: 0, name: '', location: '', category: '', status: 'Draft', featured: false }; }
}
