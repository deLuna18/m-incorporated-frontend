import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

type PostStatus = 'Draft' | 'Published' | 'Scheduled';

interface ManagedPost {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    publishDate: string;
    status: PostStatus;
    excerpt: string;
    image: string;
}

@Component({
    selector: 'app-blog-management',
    standalone: true,
    imports: [ButtonModule, CommonModule, DatePipe, DialogModule, FormsModule, InputTextModule, SelectModule, TableModule, TagModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 class="m-0 text-3xl font-semibold">Blog & News Management</h1>
                <p class="mb-0 mt-2 text-muted-color">Create, edit, schedule, and publish stories for the M Incorporated journal.</p>
            </div>
            <button pButton label="New article" icon="pi pi-plus" (click)="openNew()"></button>
        </section>

        <section class="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6" aria-label="Article summary">
            <div class="card mb-0"><span class="text-sm text-muted-color">Published</span><strong class="mt-2 block text-3xl">{{ count('Published') }}</strong></div>
            <div class="card mb-0"><span class="text-sm text-muted-color">Scheduled</span><strong class="mt-2 block text-3xl">{{ count('Scheduled') }}</strong></div>
            <div class="card mb-0"><span class="text-sm text-muted-color">Drafts</span><strong class="mt-2 block text-3xl">{{ count('Draft') }}</strong></div>
        </section>

        <section class="card">
            <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex flex-col gap-3 sm:flex-row">
                    <span class="search-field w-full sm:w-80"><i class="pi pi-search"></i><input pInputText [(ngModel)]="searchTerm" placeholder="Search articles" class="w-full" /></span>
                    <p-select [options]="filterOptions" [(ngModel)]="statusFilter" optionLabel="label" optionValue="value" styleClass="w-full sm:w-44"></p-select>
                </div>
                <span class="text-sm text-muted-color">{{ filteredPosts.length }} articles</span>
            </div>

            <p-table [value]="filteredPosts" [rows]="8" [paginator]="true" responsiveLayout="scroll">
                <ng-template #header>
                    <tr><th>Article</th><th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th><th pSortableColumn="publishDate">Publish date <p-sortIcon field="publishDate"></p-sortIcon></th><th>Status</th><th class="w-32">Actions</th></tr>
                </ng-template>
                <ng-template #body let-post>
                    <tr>
                        <td>
                            <div class="flex min-w-72 items-center gap-3">
                                <img [src]="post.image" [alt]="post.title" class="article-thumb h-12 w-12 shrink-0 object-cover" />
                                <div class="min-w-0"><div class="truncate font-medium">{{ post.title }}</div><div class="mt-1 truncate text-sm text-muted-color">{{ post.author }} · /blog/{{ post.slug }}</div></div>
                            </div>
                        </td>
                        <td>{{ post.category }}</td>
                        <td>{{ post.publishDate | date: 'MMM d, y' }}</td>
                        <td><p-tag [value]="post.status" [severity]="severityFor(post.status)"></p-tag></td>
                        <td>
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-rounded" (click)="edit(post)" [attr.aria-label]="'Edit ' + post.title"></button>
                            <button pButton icon="pi pi-trash" class="p-button-text p-button-rounded p-button-danger" (click)="remove(post)" [attr.aria-label]="'Delete ' + post.title"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage><tr><td colspan="5" class="py-8 text-center text-muted-color">No articles match the current search or status.</td></tr></ng-template>
            </p-table>
        </section>

        <p-dialog [(visible)]="dialogVisible" [modal]="true" [style]="{ width: '44rem' }" [draggable]="false" [resizable]="false" [header]="editingId ? 'Edit article' : 'New article'">
            <div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Article title</span><input pInputText [(ngModel)]="form.title" (blur)="suggestSlug()" placeholder="e.g. Inside Paris Fashion Week" /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">URL slug</span><input pInputText [(ngModel)]="form.slug" placeholder="inside-paris-fashion-week" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Category</span><input pInputText [(ngModel)]="form.category" placeholder="e.g. Editorial" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Author</span><input pInputText [(ngModel)]="form.author" placeholder="M Incorporated" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Publish date</span><input pInputText type="date" [(ngModel)]="form.publishDate" /></label>
                <label class="flex flex-col gap-2"><span class="font-medium">Status</span><p-select [options]="statuses" [(ngModel)]="form.status" optionLabel="label" optionValue="value" styleClass="w-full"></p-select></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Featured image URL</span><input pInputText [(ngModel)]="form.image" placeholder="https://..." /></label>
                <label class="flex flex-col gap-2 sm:col-span-2"><span class="font-medium">Excerpt</span><textarea [(ngModel)]="form.excerpt" rows="4" class="w-full resize-y p-3" placeholder="A concise summary for the journal listing."></textarea></label>
            </div>
            <ng-template #footer>
                <button pButton label="Cancel" class="p-button-text" (click)="dialogVisible = false"></button>
                <button pButton [label]="editingId ? 'Save changes' : 'Create article'" icon="pi pi-check" [disabled]="!form.title.trim()" (click)="save()"></button>
            </ng-template>
        </p-dialog>
    `,
    styles: `
        .search-field { position: relative; display: block; }
        .search-field > i { position: absolute; z-index: 1; top: 50%; left: 1rem; color: var(--text-color-secondary); transform: translateY(-50%); }
        .search-field input { padding-left: 2.75rem; }
        .article-thumb { border-radius: var(--content-border-radius); }
        textarea { border: 1px solid var(--surface-border); border-radius: var(--content-border-radius); color: var(--text-color); font: inherit; }
        textarea:focus { border-color: var(--primary-color); outline: 0; }
    `
})
export class BlogManagementComponent {
    searchTerm = '';
    statusFilter: PostStatus | 'All' = 'All';
    dialogVisible = false;
    editingId: number | null = null;
    form: ManagedPost = this.emptyPost();

    readonly statuses: { label: PostStatus; value: PostStatus }[] = [
        { label: 'Draft', value: 'Draft' },
        { label: 'Scheduled', value: 'Scheduled' },
        { label: 'Published', value: 'Published' }
    ];
    readonly filterOptions: { label: string; value: PostStatus | 'All' }[] = [{ label: 'All statuses', value: 'All' }, ...this.statuses];
    posts: ManagedPost[] = [
        { id: 1, title: 'Inside Paris Fashion Week', slug: 'inside-paris-fashion-week', category: 'Editorial', author: 'M Incorporated', publishDate: '2026-08-18', status: 'Published', excerpt: 'A closer look at the people, castings, and quiet preparation that shape a season.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=300&q=85' },
        { id: 2, title: 'Meet Our New Faces', slug: 'meet-our-new-faces', category: 'Talent', author: 'M Incorporated', publishDate: '2026-08-05', status: 'Published', excerpt: 'Introducing a considered selection of new talent joining the roster this season.', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=300&q=85' },
        { id: 3, title: 'Behind the Campaign', slug: 'behind-the-campaign', category: 'Behind the Scenes', author: 'M Incorporated', publishDate: '2026-09-12', status: 'Scheduled', excerpt: 'Notes from the casting, styling, and production work before a campaign goes live.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=85' },
        { id: 4, title: 'A New Point of View', slug: 'a-new-point-of-view', category: 'Agency', author: 'M Incorporated', publishDate: '2026-08-29', status: 'Draft', excerpt: 'An editorial note on the talent, culture, and creative work informing the agency.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=85' }
    ];

    get filteredPosts(): ManagedPost[] {
        const query = this.searchTerm.trim().toLowerCase();
        return this.posts.filter((post) => (!query || `${post.title} ${post.category} ${post.author}`.toLowerCase().includes(query)) && (this.statusFilter === 'All' || post.status === this.statusFilter));
    }

    count(status: PostStatus): number { return this.posts.filter((post) => post.status === status).length; }
    openNew(): void { this.editingId = null; this.form = this.emptyPost(); this.dialogVisible = true; }
    edit(post: ManagedPost): void { this.editingId = post.id; this.form = { ...post }; this.dialogVisible = true; }
    remove(post: ManagedPost): void { if (confirm(`Delete “${post.title}”?`)) this.posts = this.posts.filter((item) => item.id !== post.id); }

    suggestSlug(): void {
        if (this.editingId || this.form.slug.trim() || !this.form.title.trim()) return;
        this.form.slug = this.slugify(this.form.title);
    }

    save(): void {
        const title = this.form.title.trim();
        if (!title) return;
        const post: ManagedPost = {
            ...this.form,
            title,
            slug: this.slugify(this.form.slug || title),
            category: this.form.category.trim() || 'Editorial',
            author: this.form.author.trim() || 'M Incorporated',
            publishDate: this.form.publishDate || new Date().toISOString().slice(0, 10),
            image: this.form.image.trim() || this.emptyPost().image
        };
        this.posts = this.editingId
            ? this.posts.map((item) => item.id === this.editingId ? post : item)
            : [...this.posts, { ...post, id: Math.max(0, ...this.posts.map((item) => item.id)) + 1 }];
        this.dialogVisible = false;
    }

    severityFor(status: PostStatus): 'success' | 'warn' | 'secondary' { return status === 'Published' ? 'success' : status === 'Scheduled' ? 'warn' : 'secondary'; }

    private slugify(value: string): string {
        return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    private emptyPost(): ManagedPost {
        return {
            id: 0,
            title: '',
            slug: '',
            category: 'Editorial',
            author: 'M Incorporated',
            publishDate: new Date().toISOString().slice(0, 10),
            status: 'Draft',
            excerpt: '',
            image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=300&q=85'
        };
    }
}
