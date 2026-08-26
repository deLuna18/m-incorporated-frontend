import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

interface Development {
    title: string;
    description: string;
    icon: string;
    position: number;
}

@Component({
    selector: 'development-ways-widget',
    standalone: true,
    imports: [CommonModule, ButtonModule, RippleModule],
    templateUrl: './development-ways.component.html',
    styleUrls: ['./development-ways.component.scss']
})
export class DevelopmentWaysWidget implements OnInit {
    development: Development[] = [
        {
            title: 'Assemble the right team',
            description: "We handle all aspects of vetting and choosing the right team that you don't have the time, expertise, or desire to do.",
            icon: 'pi-users',
            position: 1
        },
        {
            title: 'Sprint planning',
            description: 'Sprint roadmap is a collective planning effort. Team members collaborate to clarify items and ensure shared understanding.',
            icon: 'pi-calendar',
            position: 2
        },
        {
            title: 'Tech architecture',
            description: 'We break monolithic apps into microservices. Decoupling the code allows teams to move faster and more independently',
            icon: 'pi-sitemap',
            position: 3
        },
        {
            title: 'Standups & weekly updates',
            description: 'Standups, weekly updates, and weekly reviews make sure everyone is on the same page and can raise their concerns.',
            icon: 'pi-comments',
            position: 4
        },
        {
            title: 'Code reviews',
            description: 'Code reviews before release help detect issues like memory leaks, file leaks, performance signs, and general bad smells',
            icon: 'pi-code',
            position: 5
        },
        {
            title: 'Iterative delivery',
            description: 'We divide the implementation process into several checkpoints rather than a single deadline.',
            icon: 'pi-sync',
            position: 6
        }
    ];

    visibleItems: Set<number> = new Set();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Initial check after view is rendered
            setTimeout(() => {
                this.checkVisibility();
            }, 100);
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.checkVisibility();
        }
    }

    checkVisibility() {
        const elements = document.querySelectorAll('.timeline-item');
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Trigger animation when element is 85% into viewport
            if (rect.top <= windowHeight * 0.85) {
                this.visibleItems.add(index);
            }
        });
    }

    isVisible(index: number): boolean {
        return this.visibleItems.has(index);
    }
}
