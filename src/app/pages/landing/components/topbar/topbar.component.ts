import { Component, HostListener } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'topbar-widget',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, RippleModule, StyleClassModule],
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarWidget {
    navLinks = [
        { label: 'HOME', fragment: 'hero-widget' },
        { label: 'MODELS', fragment: 'models' },
        { label: 'SERVICES', fragment: 'services-widget' },
        { label: 'ABOUT', fragment: 'about-widget' },
        { label: 'GALLERY', fragment: 'gallery' },
        { label: 'JOURNAL', fragment: 'projects-widget' },
        { label: 'CONTACT', fragment: 'contact-us-widget' }
    ];

    activeFragment: string = 'hero-widget';
    isMobileMenuOpen: boolean = false;

    constructor(public router: Router) {}

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.updateActiveFragment();
    }

    ngOnInit() {
        this.updateActiveFragment();
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        // Prevent body scroll when menu is open
        if (this.isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    updateActiveFragment() {
        const scrollPosition = window.scrollY + 150;

        for (const link of this.navLinks) {
            const element = document.getElementById(link.fragment);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    this.activeFragment = link.fragment;
                    break;
                }
            }
        }
    }

    scrollToSection(fragment: string): void {
        if (fragment === 'models' || fragment === 'gallery') {
            this.router.navigate([`/${fragment}`]);
            return;
        }
        const element = document.getElementById(fragment);
        if (element) {
            const topbarHeight = 100;
            const targetPosition = element.offsetTop - topbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            this.activeFragment = fragment;
        }
    }

    bookAModel(): void {
        this.router.navigate(['/booking']);
    }

    isActive(fragment: string): boolean {
        return this.activeFragment === fragment;
    }
}
