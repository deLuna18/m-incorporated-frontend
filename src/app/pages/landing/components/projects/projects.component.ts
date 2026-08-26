import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

interface Project {
    id: number;
    title: string;
    location: string;
    year: number;
    image: string;
    category: string;
}

@Component({
    selector: 'projects-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommonModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsWidget implements AfterViewInit, OnDestroy {
    private observer: IntersectionObserver | null = null;

    projects: Project[] = [
        {
            id: 1,
            title: 'End to End - Welcome Signage',
            location: 'Minglanilla, Cebu',
            year: 2025,
            image: 'assets/img/project1.png',
            category: 'Infrastructure'
        },
        {
            id: 2,
            title: 'Bohol PDRMMO, Command Center',
            location: 'Tagilaran City, Bohol',
            year: 2025,
            image: 'assets/img/project2.png',
            category: 'Command Center'
        },
        {
            id: 3,
            title: 'Inabanga Public Market',
            location: 'Inabanga, Bohol',
            year: 2025,
            image: 'assets/img/project3.png',
            category: 'Public Infrastructure'
        }
    ];

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
            this.initializeScrollAnimation();
        }, 100);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    /**
     * Initialize Intersection Observer for scroll animations
     * Triggers fade-in and slide-up effects when elements enter viewport
     */
    private initializeScrollAnimation(): void {
        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully visible
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('animate-in');

                    // Animate child elements within project cards
                    if (entry.target.classList.contains('project-card')) {
                        this.animateCardChildren(entry.target as HTMLElement);
                    }

                    // Stop observing once animated
                    this.observer?.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all elements marked for animation
        const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el: Element) => {
            this.observer?.observe(el);
        });
    }

    /**
     * Animate child elements within project cards sequentially
     */
    private animateCardChildren(card: HTMLElement): void {
        const label = card.querySelector('.project-label');
        const title = card.querySelector('.project-title');
        const location = card.querySelector('.project-location');
        const badge = card.querySelector('.category-badge');

        // Stagger animations for smooth effect
        setTimeout(() => label?.classList.add('animate-child-in'), 100);
        setTimeout(() => title?.classList.add('animate-child-in'), 200);
        setTimeout(() => location?.classList.add('animate-child-in'), 300);
        setTimeout(() => badge?.classList.add('animate-child-in'), 400);
    }

    /**
     * Handle Read More button click
     * Navigate to projects page or trigger modal
     */
    onReadMore(): void {
        console.log('Read more clicked - navigating to projects page');
        // TODO: Implement navigation logic
        // this.router.navigate(['/projects']);
        // or open modal, etc.
    }
}
