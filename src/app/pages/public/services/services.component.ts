import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';
import { PublicFooterComponent } from '../../../shared-component/public-footer/public-footer.component';

@Component({
  selector: 'app-services',
  imports: [TopbarWidget, PublicFooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private fallbackTimer?: number;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const root = this.host.nativeElement;
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

    root.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.addEventListener('error', () => this.useImageFallback(image), { once: true });
    });

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('show'));
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px 120px 0px' });

    revealItems.forEach((item) => this.observer?.observe(item));
    this.fallbackTimer = window.setTimeout(() => {
      revealItems
        .filter((item) => item.getBoundingClientRect().top < window.innerHeight + 160)
        .forEach((item) => item.classList.add('show'));
    }, 800);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.fallbackTimer) window.clearTimeout(this.fallbackTimer);
  }

  private useImageFallback(image: HTMLImageElement): void {
    image.alt = image.alt || 'M Incorporated service image';
    image.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <rect width="1200" height="900" fill="#e9e6df"/>
        <text x="600" y="420" fill="#111" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" letter-spacing="8">M INCORPORATED</text>
        <text x="600" y="465" fill="#555" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" letter-spacing="4">SERVICES</text>
      </svg>
    `)}`;
  }

}
