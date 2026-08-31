import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements AfterViewInit {
  private readonly slugs = ['luna-martinez', 'noah-valentino', 'ella-roberts', 'jordan-reid', 'mia-laurent', 'elias-ward', 'sora-kim', 'theo-rossi', 'amara-okafor', 'mateo-cruz', 'clara-moreau', 'jin-park', 'ava-sinclair', 'leo-moretti', 'camille-duval', 'adrian-cole', 'yuna-choi', 'nico-bellini', 'elena-voss', 'kai-nakamura', 'sofia-marin', 'julien-marchand', 'aria-bennett', 'marco-leone', 'isla-hart', 'daniel-seo', 'louise-garnier', 'hugo-laurent', 'maya-collins', 'lorenzo-ricci', 'nina-foster', 'ethan-blake'];
  private selectedSlug = '';

  constructor(private readonly host: ElementRef<HTMLElement>, private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngAfterViewInit(): void {
    const select = this.root.querySelector<HTMLSelectElement>('#modelSelect');
    this.slugs.forEach((slug) => select?.add(new Option(`${this.nameFor(slug)} — ${this.locationFor(slug)}`, slug)));
    this.route.queryParamMap.subscribe((params) => {
      this.selectedSlug = this.slugs.includes(params.get('model') ?? '') ? params.get('model')! : '';
      if (select) select.value = this.selectedSlug;
      this.renderSelectedModel();
    });
  }

  onClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    const menuButton = target?.closest('#menuBtn') as HTMLButtonElement | null;
    if (menuButton) {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.textContent = open ? 'MENU' : 'CLOSE';
      this.root.querySelector('#mobileNav')?.classList.toggle('hidden', open);
    }
  }

  onModelChange(event: Event): void {
    this.selectedSlug = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/booking'], { queryParams: this.selectedSlug ? { model: this.selectedSlug } : {} });
  }

  onFileChange(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    const list = this.root.querySelector<HTMLElement>('#fileList');
    if (!list) return;
    list.classList.toggle('hidden', files.length === 0);
    list.innerHTML = files.map((file) => `<div class="flex items-center justify-between gap-4 bg-ivory px-4 py-3"><div class="min-w-0"><p class="truncate text-[8px] font-semibold tracking-[.06em]">${file.name}</p><p class="mt-1 text-[7px] text-muted">${(file.size / 1024 / 1024).toFixed(2)} MB</p></div><span class="text-[7px] font-semibold tracking-[.12em] text-gold">ATTACHED</span></div>`).join('');
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.classList.add('hidden');
    this.root.querySelector('#successState')?.classList.remove('hidden');
    this.root.querySelector('#successState')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  newInquiry(): void {
    const form = this.root.querySelector<HTMLFormElement>('#bookingForm');
    form?.reset();
    const select = this.root.querySelector<HTMLSelectElement>('#modelSelect');
    if (select) select.value = this.selectedSlug;
    this.root.querySelector('#fileList')?.classList.add('hidden');
    this.root.querySelector('#fileList')!.innerHTML = '';
    this.root.querySelector('#successState')?.classList.add('hidden');
    form?.classList.remove('hidden');
  }

  private get root(): HTMLElement { return this.host.nativeElement; }
  private renderSelectedModel(): void {
    const hasModel = Boolean(this.selectedSlug);
    const name = hasModel ? this.nameFor(this.selectedSlug) : 'No model selected';
    const location = hasModel ? this.locationFor(this.selectedSlug) : 'CHOOSE A MODEL IN THE FORM';
    const image = hasModel ? `https://images.unsplash.com/photo-${this.imageFor(this.selectedSlug)}?auto=format&fit=crop&w=1200&q=90` : 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90';
    const portrait = this.root.querySelector<HTMLImageElement>('#selectedModelImage');
    if (portrait) { portrait.src = image; portrait.alt = hasModel ? `${name} model portrait` : 'Editorial model'; }
    this.setText('#selectedModelName', name); this.setText('#selectedModelMeta', hasModel ? `${location} · ${this.categoryFor(this.selectedSlug)}` : location);
    const profile = this.root.querySelector<HTMLAnchorElement>('#viewProfileLink');
    if (profile) { profile.href = hasModel ? `/model-profile?model=${this.selectedSlug}` : '/models'; profile.textContent = hasModel ? 'VIEW →' : 'BROWSE →'; }
  }
  private setText(selector: string, value: string): void { const element = this.root.querySelector(selector); if (element) element.textContent = value; }
  private nameFor(slug: string): string { return slug.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' '); }
  private locationFor(slug: string): string { return ['NEW YORK', 'MILAN', 'PARIS', 'LONDON', 'SEOUL'][this.slugs.indexOf(slug) % 5]; }
  private categoryFor(slug: string): string { return this.slugs.indexOf(slug) % 2 ? 'MEN · COMMERCIAL' : 'WOMEN · COMMERCIAL'; }
  private imageFor(slug: string): string { return ['1524504388940-b1c1722653e1', '1506794778202-cad84cf45f1d', '1529139574466-a303027c1d8b', '1507003211169-0a1dd7228f2d'][this.slugs.indexOf(slug) % 4]; }

}
