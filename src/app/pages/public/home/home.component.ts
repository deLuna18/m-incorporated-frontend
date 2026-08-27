import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';

type DropdownName = 'category' | 'location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarWidget],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clientsSection') clientsSection?: ElementRef<HTMLElement>;

  menuOpen = false;
  // Keep this section available immediately; its CSS animation still plays on initial render.
  clientsVisible = true;
  openDropdown: DropdownName | null = null;
  category = '';
  categoryLabel = 'ALL CATEGORIES';
  location = '';
  locationLabel = 'ALL LOCATIONS';
  private clientsObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    const section = this.clientsSection?.nativeElement;
    if (!section) return;

    this.clientsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.clientsVisible = true;
          this.clientsObserver?.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    this.clientsObserver.observe(section);
  }

  ngOnDestroy(): void {
    this.clientsObserver?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onDropdownToggle(name: DropdownName, event: Event): void {
    const dropdown = event.currentTarget as HTMLDetailsElement;
    this.openDropdown = dropdown.open ? name : this.openDropdown === name ? null : this.openDropdown;
  }

  selectDropdown(name: DropdownName, value: string, label: string): void {
    if (name === 'category') {
      this.category = value;
      this.categoryLabel = label;
    } else {
      this.location = value;
      this.locationLabel = label;
    }

    this.openDropdown = null;
  }

  closeDropdowns(event: MouseEvent): void {
    const target = event.target as Element | null;
    if (!target?.closest('.model-dropdown')) {
      this.openDropdown = null;
    }
  }

}
