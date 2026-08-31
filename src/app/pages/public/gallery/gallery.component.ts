import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';
import { PublicFooterComponent } from '../../../shared-component/public-footer/public-footer.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [TopbarWidget, PublicFooterComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private revealFallbackTimer?: number;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.root.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleEscape);
    this.root.querySelectorAll<HTMLVideoElement>('video[poster]').forEach((video) => {
      video.style.backgroundImage = `url("${video.poster}")`;
      video.addEventListener('loadeddata', () => video.style.backgroundImage = 'none');
    });

    this.root.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.addEventListener('error', () => this.useImageFallback(image), { once: true });
    });

    const revealElements = Array.from(this.root.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('show'));
      return;
    }

    this.observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('show'); this.observer?.unobserve(entry.target); }
    }), { threshold: 0.1, rootMargin: '0px 0px 120px 0px' });
    revealElements.forEach((element) => this.observer?.observe(element));

    this.revealFallbackTimer = window.setTimeout(() => {
      revealElements
        .filter((element) => element.getBoundingClientRect().top < window.innerHeight + 160)
        .forEach((element) => element.classList.add('show'));
    }, 900);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.revealFallbackTimer) window.clearTimeout(this.revealFallbackTimer);
    this.root.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleEscape);
  }

  openVideo(src: string, title: string, subtitle: string, poster: string): void {
    const modal = this.root.querySelector<HTMLElement>('#videoModal');
    const video = this.root.querySelector<HTMLVideoElement>('#modalVideo');
    if (!modal || !video) return;
    video.pause(); video.src = src; video.poster = poster;
    this.setText('#videoModalTitle', title); this.setText('#videoModalSubtitle', subtitle);
    modal.classList.add('open'); this.setPageScroll(false); video.load(); video.play().catch(() => undefined);
  }

  private readonly handleClick = (event: Event): void => {
    const target = event.target as Element | null;
    if (!target) return;
    if (target.closest('#menuBtn')) { this.root.querySelector('#mobileMenu')?.classList.toggle('hidden'); return; }
    if (target.closest('#heroSoundBtn')) { this.toggleHeroSound(); return; }
    const filter = target.closest<HTMLButtonElement>('.filter-btn');
    if (filter) { this.applyFilter(filter.dataset['filter'] ?? 'all'); return; }
    if (target.closest('#viewModeBtn')) { this.toggleViewMode(); return; }
    const item = target.closest<HTMLElement>('.gallery-item');
    if (item) { this.openImage(item); return; }
    if (target.closest('#closeImageModal')) { this.closeImage(); return; }
    if (target.closest('#closeVideoModal')) { this.closeVideo(); return; }
    if (target === this.root.querySelector('#imageModal')) { this.closeImage(); return; }
    if (target === this.root.querySelector('#videoModal')) this.closeVideo();
  };
  private readonly handleEscape = (event: KeyboardEvent): void => { if (event.key === 'Escape') { this.closeImage(); this.closeVideo(); } };
  private applyFilter(filter: string): void {
    this.root.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach((button) => button.classList.toggle('active', button.dataset['filter'] === filter));
    this.root.querySelectorAll<HTMLElement>('.gallery-item').forEach((item) => item.style.display = filter === 'all' || item.dataset['category'] === filter ? '' : 'none');
  }
  private toggleViewMode(): void {
    const grid = this.root.querySelector('#galleryGrid'); const button = this.root.querySelector<HTMLButtonElement>('#viewModeBtn');
    if (!grid || !button) return;
    button.textContent = grid.classList.toggle('contact-mode') ? 'EDITORIAL VIEW' : 'CONTACT SHEET';
  }
  private openImage(item: HTMLElement): void {
    const modal = this.root.querySelector<HTMLElement>('#imageModal'); const image = this.root.querySelector<HTMLImageElement>('#imageModalImg');
    if (!modal || !image) return;
    image.src = item.dataset['img'] ?? ''; image.alt = item.dataset['title'] ?? '';
    this.setText('#imageModalTitle', item.dataset['title'] ?? ''); this.setText('#imageModalSubtitle', item.dataset['subtitle'] ?? '');
    modal.classList.add('open'); this.setPageScroll(false);
  }
  private closeImage(): void { this.root.querySelector('#imageModal')?.classList.remove('open'); this.setPageScroll(true); }
  private closeVideo(): void {
    const video = this.root.querySelector<HTMLVideoElement>('#modalVideo'); video?.pause(); video?.removeAttribute('src'); video?.load();
    this.root.querySelector('#videoModal')?.classList.remove('open'); this.setPageScroll(true);
  }
  private toggleHeroSound(): void {
    const video = this.root.querySelector<HTMLVideoElement>('#heroVideo'); const button = this.root.querySelector<HTMLButtonElement>('#heroSoundBtn'); const icon = this.root.querySelector('#soundIcon');
    if (!video || !button || !icon) return;
    video.muted = !video.muted; icon.textContent = video.muted ? '○' : '●'; button.lastChild!.textContent = video.muted ? ' SOUND OFF' : ' SOUND ON';
  }
  private setText(selector: string, value: string): void { const element = this.root.querySelector(selector); if (element) element.textContent = value; }
  private setPageScroll(allow: boolean): void { document.body.style.overflow = allow ? '' : 'hidden'; }
  private useImageFallback(image: HTMLImageElement): void {
    const label = image.alt || 'M Incorporated gallery image';
    image.alt = label;
    image.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#e9e6df"/><text x="400" y="470" text-anchor="middle" fill="#111" font-family="Arial, sans-serif" font-size="34" letter-spacing="8">M INCORPORATED</text><text x="400" y="525" text-anchor="middle" fill="#666" font-family="Arial, sans-serif" font-size="18" letter-spacing="4">MEDIA ARCHIVE</text></svg>`)}`;
  }
  private get root(): HTMLElement { return this.host.nativeElement; }

}
