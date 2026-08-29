import { Component } from '@angular/core';
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
        { label: 'HOME', path: '/' },
        { label: 'MODELS', path: '/models' },
        { label: 'SERVICES', path: '/services' },
        { label: 'ABOUT', path: '/about' },
        { label: 'GALLERY', path: '/gallery' },
        { label: 'BLOG', path: '/blog' },
        { label: 'CONTACT', path: '/contact' }
    ];

    isMobileMenuOpen: boolean = false;

    constructor(public router: Router) {}

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        // Prevent body scroll when menu is open
        if (this.isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    navigate(path: string): void {
        this.router.navigateByUrl(path);
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }

    bookAModel(): void {
        this.router.navigate(['/booking']);
    }

    isActive(path: string): boolean {
        return path === '/' ? this.router.url === '/' : this.router.url.startsWith(path);
    }
}
