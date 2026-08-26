import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

interface ProcessStep {
    number: number;
    title: string;
    description: string;
}

@Component({
    selector: 'how-get-started-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommonModule],
    templateUrl: './how-get-started.component.html',
    styleUrls: ['./how-get-started.component.scss']
})
export class HowGetStartedWidget implements OnInit, OnDestroy {
    steps: ProcessStep[] = [
        {
            number: 1,
            title: 'Initial Consultation',
            description: 'Understand your goals, scope, and timeline.'
        },
        {
            number: 2,
            title: 'Solution Proposal',
            description: 'Tailored plan and cost estimate.'
        },
        {
            number: 3,
            title: 'Agreement & Kick-Off',
            description: 'Formalize scope and begin execution.'
        },
        {
            number: 4,
            title: 'Implementation & Review',
            description: 'Deliver, test and refine with client feedback.'
        },
        {
            number: 5,
            title: 'Handover & Support',
            description: 'Ensure smooth transition and post-project care.'
        }
    ];

    private observer?: IntersectionObserver;

    constructor(
        private router: Router,
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.setupScrollAnimation();
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setupScrollAnimation() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe all animated elements
        const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el: Element) => {
            this.observer?.observe(el);
        });
    }

    scheduleConsultation() {
        // Add your consultation scheduling logic here
        console.log('Schedule consultation clicked');
    }
}
