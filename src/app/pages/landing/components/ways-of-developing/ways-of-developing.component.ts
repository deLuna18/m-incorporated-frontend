import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

interface Value {
    title: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'ways-of-developing-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommonModule],
    templateUrl: './ways-of-developing.component.html',
    styleUrls: ['./ways-of-developing.component.scss']
})
export class WaysOfDevelopingWidget implements OnInit, AfterViewInit, OnDestroy {
    private observer?: IntersectionObserver;

    logos = [
        { src: 'assets/img/customized-solutions-1.png', alt: 'Partner 1' },
        { src: 'assets/img/qualified-staff-1.png', alt: 'Partner 2' },
        { src: 'assets/img/customer-service-1.png', alt: 'Partner 3' },
        { src: 'assets/img/competitive-prices-1.png', alt: 'Partner 4' },
        { src: 'assets/img/quality-assurance-1.png', alt: 'Partner 6' }
    ];

    techstack = [
        { src: 'assets/img/logo1.1.png', alt: 'Ruby' },
        { src: 'assets/img/logo2.png', alt: 'C #' },
        { src: 'assets/img/logo3.png', alt: 'Ajax' },
        { src: 'assets/img/logo4.png', alt: 'C++' },
        { src: 'assets/img/logo5.png', alt: 'Microsoft Visual Studio' },
        { src: 'assets/img/logo6.png', alt: 'Phython' },
        { src: 'assets/img/logo7.png', alt: 'Java' },
        { src: 'assets/img/logo8.png', alt: 'Microsoft SQL Server' },
        { src: 'assets/img/logo9.png', alt: 'MySQL' },
        { src: 'assets/img/logo10.png', alt: 'Delphi' },
        { src: 'assets/img/logo11.png', alt: 'Wamp' },
        { src: 'assets/img/logo12.png', alt: 'Wordpress' },
        { src: 'assets/img/logo13.png', alt: 'Javascript' },
        { src: 'assets/img/logo14.png', alt: 'HTML, CSS, Javascript' },
        { src: 'assets/img/logo15.png', alt: 'Angular' },
        { src: 'assets/img/logo16.png', alt: 'PostgreSQL' }
    ];

    coreValues: Value[] = [
        {
            title: 'Customized Solutions',
            description: 'We listen to your needs and preferences, and we tailor our services to suit your vision and budget. We work with you from the initial consultation to the final inspection, ensuring that every detail is taken care of.',
            icon: 'pi-trophy'
        },
        {
            title: 'Qualified Staff',
            description:
                'We have a team of highly qualified and experienced engineers, designers, managers, and developers who have the knowledge and expertise to handle any challenge. We use the latest tools and technology, and we follow the best practices and standards in the industry.',
            icon: 'pi-lightbulb'
        },
        {
            title: 'Customer Service',
            description:
                'We value our customers, and we treat them with respect and professionalism. We communicate with you regularly, keeping you updated on the progress of the project. We also welcome your feedback and suggestions, and we address any issues or concerns promptly.',
            icon: 'pi-shield'
        },
        {
            title: 'Competitive Prices',
            description: 'We offer fair and transparent pricing, with no hidden fees or extra charges. We provide free consultancy, and we guarantee that you will get the best value for your money.',
            icon: 'pi-check-circle'
        },
        {
            title: 'Quality Assurance',
            description:
                'We utilize only industry-leading technologies and trusted software platforms sourced from reputable providers, ensuring compliance with the highest standards of performance and security. Each solution undergoes rigorous testing, validation, and quality assurance reviews throughout the project lifecycle. We further reinforce client confidence through system warranties, service guarantees, and ongoing technical support to maintain optimal reliability and performance.',
            icon: 'pi-users'
        }
    ];

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.setupScrollAnimation();
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setupScrollAnimation(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        const timelineItems = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
        timelineItems.forEach((item: Element) => {
            this.observer?.observe(item);
        });

        const header = this.elementRef.nativeElement.querySelector('.max-w-4xl');
        if (header) {
            header.classList.add('timeline-item');
            this.observer?.observe(header);
        }
    }
}
