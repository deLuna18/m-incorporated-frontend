import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [],
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent implements AfterViewInit {
  private cards: HTMLElement[] = [];
  private activeCategory = 'all';
  private location = '';
  private sort = 'featured';
  private query = '';

  constructor(private readonly host: ElementRef<HTMLElement>, private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.cards = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.model-card'));
    this.applyQueryParams();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.id !== 'searchInput') return;
    this.query = input.value.trim().toLowerCase();
    this.applyFilters();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    if (!target) return;
    const profileLink = target.closest<HTMLAnchorElement>('a[href^="model-profile.html?model="]');
    if (profileLink) {
      event.preventDefault();
      const slug = new URL(profileLink.href).searchParams.get('model');
      this.router.navigate(['/model-profile'], { queryParams: { model: slug } });
      return;
    }
    const menuButton = target.closest('#menuBtn');
    if (menuButton) {
      this.toggleMenu(menuButton as HTMLButtonElement);
      return;
    }
    const locationOption = target.closest<HTMLElement>('.location-option');
    if (locationOption) {
      this.location = locationOption.dataset['location'] ?? '';
      this.setDropdownLabel(locationOption, locationOption.textContent?.trim() ?? 'EDITORS PICK');
      this.applyFilters();
      return;
    }
    const sortOption = target.closest<HTMLElement>('.sort-option');
    if (sortOption) {
      this.sort = sortOption.dataset['sort'] ?? 'featured';
      this.setDropdownLabel(sortOption, sortOption.textContent?.trim() ?? 'FEATURED FIRST');
      this.applyFilters();
      return;
    }
    const categoryTab = target.closest<HTMLElement>('.filter-tab');
    if (categoryTab) {
      this.activeCategory = categoryTab.dataset['category'] ?? 'all';
      this.host.nativeElement.querySelectorAll('.filter-tab').forEach((tab) => tab.classList.toggle('is-active', tab === categoryTab));
      this.applyFilters();
      return;
    }
    if (target.closest('#clearFilters') || target.closest('[data-clear]')) this.resetFilters();
  }

  private toggleMenu(button: HTMLButtonElement): void {
    const menu = this.host.nativeElement.querySelector<HTMLElement>('#mobileNav');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.textContent = isOpen ? 'MENU' : 'CLOSE';
    menu?.classList.toggle('hidden', isOpen);
  }

  private setDropdownLabel(option: HTMLElement, label: string): void {
    const dropdown = option.closest('details');
    dropdown?.querySelector('[data-label]')?.replaceChildren(label);
    dropdown?.removeAttribute('open');
  }

  private applyFilters(): void {
    this.cards.forEach((card) => {
      const name = card.dataset['name']?.toLowerCase() ?? '';
      const categories = card.dataset['category']?.split(' ') ?? [];
      const cardLocation = card.dataset['location'] ?? '';
      card.hidden = !((!this.query || name.includes(this.query)) && (this.activeCategory === 'all' || categories.includes(this.activeCategory)) && (!this.location || cardLocation === this.location));
    });
    this.sortCards();
    const visible = this.cards.filter((card) => !card.hidden).length;
    const resultCount = this.host.nativeElement.querySelector('#resultCount');
    const emptyState = this.host.nativeElement.querySelector<HTMLElement>('#emptyState');
    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'MODEL' : 'MODELS'}`;
    emptyState?.classList.toggle('hidden', visible !== 0);
  }

  private sortCards(): void {
    const grid = this.host.nativeElement.querySelector('#modelGrid');
    if (!grid) return;
    [...this.cards].sort((a, b) => {
      const aName = a.dataset['name'] ?? '';
      const bName = b.dataset['name'] ?? '';
      if (this.sort === 'name-asc') return aName.localeCompare(bName);
      if (this.sort === 'name-desc') return bName.localeCompare(aName);
      return Number(b.dataset['featured']) - Number(a.dataset['featured']) || aName.localeCompare(bName);
    }).forEach((card) => grid.appendChild(card));
  }

  private resetFilters(): void {
    this.query = '';
    this.location = '';
    this.sort = 'featured';
    this.activeCategory = 'all';
    const root = this.host.nativeElement;
    const search = root.querySelector<HTMLInputElement>('#searchInput');
    if (search) search.value = '';
    root.querySelectorAll('details').forEach((dropdown) => dropdown.removeAttribute('open'));
    const labels = root.querySelectorAll<HTMLElement>('.directory-dropdown [data-label]');
    if (labels[0]) labels[0].textContent = 'EDITORS PICK';
    if (labels[1]) labels[1].textContent = 'FEATURED FIRST';
    root.querySelectorAll('.filter-tab').forEach((tab) => tab.classList.toggle('is-active', (tab as HTMLElement).dataset['category'] === 'all'));
    this.applyFilters();
  }

  private applyQueryParams(): void {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') ?? '';
    this.query = search.toLowerCase();
    this.location = params.get('location') ?? '';
    const category = params.get('category') ?? 'all';
    if (category === 'all' || this.cards.some((card) => (card.dataset['category'] ?? '').split(' ').includes(category))) this.activeCategory = category;
    const searchInput = this.host.nativeElement.querySelector<HTMLInputElement>('#searchInput');
    if (searchInput) searchInput.value = search;
    const selectedCategory = this.host.nativeElement.querySelector<HTMLElement>(`.filter-tab[data-category="${this.activeCategory}"]`);
    selectedCategory?.classList.add('is-active');
    const selectedLocation = this.host.nativeElement.querySelector<HTMLElement>(`.location-option[data-location="${this.location}"]`);
    if (selectedLocation) this.setDropdownLabel(selectedLocation, selectedLocation.textContent?.trim() ?? 'EDITORS PICK');
    this.applyFilters();
  }

}
