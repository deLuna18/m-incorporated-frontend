import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-general-settings',
    standalone: true,
    imports: [ButtonModule, FormsModule, InputTextModule, MessageModule],
    template: `
        <section class="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><h1 class="m-0 text-3xl font-semibold">General Settings</h1><p class="mb-0 mt-2 text-muted-color">Maintain the shared agency information used across the public website.</p></div>
            <button pButton label="Save settings" icon="pi pi-check" (click)="save()"></button>
        </section>

        @if (saved) { <p-message severity="success" styleClass="mb-6" text="Settings saved for this frontend session."></p-message> }

        <div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <section class="card mb-0">
                <div class="mb-5"><h2 class="m-0 text-xl font-semibold">Agency profile</h2><p class="mb-0 mt-1 text-sm text-muted-color">Brand information used in page titles, navigation, and the footer.</p></div>
                <div class="flex flex-col gap-4"><label class="flex flex-col gap-2"><span class="font-medium">Agency name</span><input pInputText [(ngModel)]="settings.agencyName" /></label><label class="flex flex-col gap-2"><span class="font-medium">Legal / trading name</span><input pInputText [(ngModel)]="settings.legalName" /></label><label class="flex flex-col gap-2"><span class="font-medium">Brand tagline</span><input pInputText [(ngModel)]="settings.tagline" /></label><label class="flex flex-col gap-2"><span class="font-medium">Logo URL</span><input pInputText [(ngModel)]="settings.logoUrl" placeholder="https://..." /></label></div>
            </section>

            <section class="card mb-0">
                <div class="mb-5"><h2 class="m-0 text-xl font-semibold">Contact details</h2><p class="mb-0 mt-1 text-sm text-muted-color">Primary contact information for public enquiries and booking requests.</p></div>
                <div class="flex flex-col gap-4"><label class="flex flex-col gap-2"><span class="font-medium">General enquiries email</span><input pInputText [(ngModel)]="settings.email" type="email" /></label><label class="flex flex-col gap-2"><span class="font-medium">Booking email</span><input pInputText [(ngModel)]="settings.bookingEmail" type="email" /></label><label class="flex flex-col gap-2"><span class="font-medium">Phone number</span><input pInputText [(ngModel)]="settings.phone" /></label><label class="flex flex-col gap-2"><span class="font-medium">Office location</span><input pInputText [(ngModel)]="settings.location" /></label></div>
            </section>

            <section class="card mb-0">
                <div class="mb-5"><h2 class="m-0 text-xl font-semibold">Social links</h2><p class="mb-0 mt-1 text-sm text-muted-color">Use full account URLs; these will later power the public footer and social archive links.</p></div>
                <div class="flex flex-col gap-4"><label class="flex flex-col gap-2"><span class="font-medium">Instagram</span><input pInputText [(ngModel)]="settings.instagram" placeholder="https://instagram.com/..." /></label><label class="flex flex-col gap-2"><span class="font-medium">TikTok</span><input pInputText [(ngModel)]="settings.tiktok" placeholder="https://tiktok.com/@..." /></label><label class="flex flex-col gap-2"><span class="font-medium">Facebook</span><input pInputText [(ngModel)]="settings.facebook" placeholder="https://facebook.com/..." /></label><label class="flex flex-col gap-2"><span class="font-medium">LinkedIn</span><input pInputText [(ngModel)]="settings.linkedin" placeholder="https://linkedin.com/company/..." /></label></div>
            </section>

            <section class="card mb-0">
                <div class="mb-5"><h2 class="m-0 text-xl font-semibold">Default SEO</h2><p class="mb-0 mt-1 text-sm text-muted-color">Fallback metadata for public pages that do not define their own search content.</p></div>
                <div class="flex flex-col gap-4"><label class="flex flex-col gap-2"><span class="font-medium">Default page title</span><input pInputText [(ngModel)]="settings.seoTitle" /></label><label class="flex flex-col gap-2"><span class="font-medium">Default meta description</span><textarea [(ngModel)]="settings.seoDescription" rows="5" class="w-full resize-y p-3"></textarea></label><label class="flex items-center gap-3"><input type="checkbox" [(ngModel)]="settings.indexSite" class="h-4 w-4" /><span>Allow public pages to be indexed by search engines</span></label></div>
            </section>
        </div>
    `,
    styles: `
        textarea { border: 1px solid var(--surface-border); border-radius: var(--content-border-radius); color: var(--text-color); font: inherit; }
        textarea:focus { border-color: var(--primary-color); outline: 0; }
    `
})
export class GeneralSettingsComponent {
    saved = false;
    settings = {
        agencyName: 'M Incorporated',
        legalName: 'M Incorporated Model Management',
        tagline: 'International model and talent management',
        logoUrl: '',
        email: 'hello@m-incorporated.com',
        bookingEmail: 'bookings@m-incorporated.com',
        phone: '+1 (212) 555 0988',
        location: 'New York, NY',
        instagram: '',
        tiktok: '',
        facebook: '',
        linkedin: '',
        seoTitle: 'M Incorporated | Model Management',
        seoDescription: 'International model management for fashion, culture, and creative industries.',
        indexSite: true
    };

    save(): void {
        this.saved = true;
        window.setTimeout(() => this.saved = false, 3500);
    }
}
