import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type UserRole = 'Moderator' | 'Administrator';
type UserStatus = 'Active' | 'Inactive';
interface ManagedUser { id: number; name: string; email: string; role: UserRole; status: UserStatus; }

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DialogModule, FormsModule, InputTextModule, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h1 class="m-0 text-3xl font-semibold">User Management</h1><p class="mb-0 mt-2 text-muted-color">Manage the moderator accounts that can access this admin portal.</p></div><button pButton label="Add user" icon="pi pi-plus" (click)="openNew()"></button></section>
        <div class="card"><div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span class="font-semibold text-xl">Admin users <span class="ml-2 text-base font-normal text-muted-color">({{ filteredUsers.length }})</span></span><span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search users" class="w-full" /></span></div><p-table [value]="filteredUsers" [rows]="8" [paginator]="true" responsiveLayout="scroll"><ng-template #header><tr><th>User</th><th>Role</th><th>Status</th><th class="w-32">Actions</th></tr></ng-template><ng-template #body let-user><tr><td><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary dark:bg-primary-400/10">{{ initials(user.name) }}</span><div><div class="font-medium">{{ user.name }}</div><div class="mt-1 text-sm text-muted-color">{{ user.email }}</div></div></div></td><td>{{ user.role }}</td><td><p-tag [value]="user.status" [severity]="user.status === 'Active' ? 'success' : 'secondary'"></p-tag></td><td><button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded" (click)="edit(user)" aria-label="Edit user"></button><button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" (click)="remove(user)" aria-label="Delete user"></button></td></tr></ng-template><ng-template #emptymessage><tr><td colspan="4" class="py-8 text-center text-muted-color">No users match your search.</td></tr></ng-template></p-table></div>
        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '34rem' }" [draggable]="false" [resizable]="false" [header]="editingId ? 'Edit user' : 'Add user'"><div class="flex flex-col gap-4 pt-2"><label class="flex flex-col gap-2"><span class="font-medium">Full name</span><input pInputText [(ngModel)]="form.name" placeholder="e.g. Jane Doe" /></label><label class="flex flex-col gap-2"><span class="font-medium">Email address</span><input pInputText [(ngModel)]="form.email" type="email" placeholder="jane@example.com" /></label><label class="flex flex-col gap-2"><span class="font-medium">Role</span><p-select [options]="roles" [(ngModel)]="form.role" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label><label class="flex flex-col gap-2"><span class="font-medium">Account status</span><p-select [options]="statuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label></div><ng-template #footer><button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button><button pButton label="Save user" icon="pi pi-check" [disabled]="!form.name.trim() || !form.email.trim()" (click)="save()"></button></ng-template></p-dialog>
    `,
    styles: `.search-field { position:relative; display:block; }.search-field > i { position:absolute; z-index:1; top:50%; left:1rem; transform:translateY(-50%); color:var(--text-color-secondary); }.search-field input { padding-left:2.75rem; }`
})
export class UserManagementComponent {
    searchTerm = ''; dialogVisible = false; editingId: number | null = null; form: ManagedUser = this.emptyUser();
    readonly roles: { label: UserRole; value: UserRole }[] = [{ label: 'Moderator', value: 'Moderator' }, { label: 'Administrator', value: 'Administrator' }];
    readonly statuses: { label: UserStatus; value: UserStatus }[] = [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }];
    users: ManagedUser[] = [{ id: 1, name: 'Demo Moderator', email: 'demo@m-incorporated.com', role: 'Administrator', status: 'Active' }, { id: 2, name: 'Olivia Brooks', email: 'olivia@m-incorporated.com', role: 'Moderator', status: 'Active' }, { id: 3, name: 'James Wilson', email: 'james@m-incorporated.com', role: 'Moderator', status: 'Inactive' }];
    get filteredUsers() { const query = this.searchTerm.trim().toLowerCase(); return !query ? this.users : this.users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query)); }
    openNew() { this.editingId = null; this.form = this.emptyUser(); this.dialogVisible = true; }
    edit(user: ManagedUser) { this.editingId = user.id; this.form = { ...user }; this.dialogVisible = true; }
    remove(user: ManagedUser) { if (confirm(`Remove ${user.name}'s admin access?`)) this.users = this.users.filter((item) => item.id !== user.id); }
    save() { const name = this.form.name.trim(), email = this.form.email.trim(); if (!name || !email) return; const user = { ...this.form, name, email }; if (this.editingId) this.users = this.users.map((item) => item.id === this.editingId ? user : item); else this.users = [...this.users, { ...user, id: Math.max(0, ...this.users.map((item) => item.id)) + 1 }]; this.dialogVisible = false; }
    initials(name: string) { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); }
    private emptyUser(): ManagedUser { return { id: 0, name: '', email: '', role: 'Moderator', status: 'Active' }; }
}
