import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    gradient: string;
    textColor: string;
}

@Component({
    selector: 'services-widget',
    standalone: true,
    imports: [CommonModule, CarouselModule, ButtonModule],
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesWidget implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('carousel') carousel: any;
    @ViewChild('servicesWidget', { static: false }) servicesWidget!: ElementRef;

    currentPage: number = 0;
    numVisible: number = 3;
    isMobile: boolean = false;

    // Animation states
    isHeaderVisible: boolean = false;
    isCarouselVisible: boolean = false;
    isIndicatorsVisible: boolean = false;
    isCounterVisible: boolean = false;
    visibleMobileCards: Set<number> = new Set();

    private observer?: IntersectionObserver;
    private elementObservers: IntersectionObserver[] = [];
    private observerSetupTimeout: any;

    services: Service[] = [
        {
            id: 0,
            icon: 'pi pi-bolt',
            title: 'Emergency Rapid Response & Dispatch System',
            description:
                'Technology-driven platform designed to enhance emergency management and public safety operations. It integrates real-time monitoring, automated dispatching, and digital communication tools to ensure that first responders can act quickly, accurately, and efficiently in critical situations.',
            gradient: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
            textColor: '#2d3748'
        },
        {
            id: 1,
            icon: 'pi pi-building',
            title: 'Local Government Management System',
            description:
                'Comprehensive digital platform designed to streamline and automate local government operations. Built with a focus on efficiency, transparency, and citizen engagement, the system enables local government units (LGUs) to deliver faster, data-driven, and accountable public services.',
            gradient: 'linear-gradient(135deg, #f5f5f5 0%, #bdbdbd 100%)',
            textColor: '#2d3748'
        },
        {
            id: 2,
            icon: 'pi pi-exclamation-triangle',
            title: 'Early Warning Management System',
            description:
                'An integrated, technology-driven platform designed to support disaster preparedness, risk reduction, and emergency communication at the local and regional levels. It enables government agencies and disaster management offices to detect threats, issue timely alerts, and coordinate rapid response actions—minimizing loss of life, property, and disruption.',
            gradient: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
            textColor: '#2d3748'
        },
        {
            id: 3,
            icon: 'pi pi-sitemap',
            title: 'Custom ERP (Enterprise Resource Planning) System',
            description:
                'A modular and fully configurable business management platform designed to unify operations, automate workflows, and provide real-time insights across all departments of an organization. Developed using modern web technologies and secure cloud infrastructure, ERP integrates finance, HR, inventory, procurement, logistics, and project management into one cohesive digital ecosystem.',
            gradient: 'linear-gradient(135deg, #e5e5e5 0%, #bdbdbd 100%)',
            textColor: '#2d3748'
        },
        {
            id: 4,
            icon: 'pi pi-desktop',
            title: 'Command and Control Center Setup',
            description:
                'Turnkey solution for building and deploying state-of-the-art control and monitoring facilities tailored to the needs of local governments, public safety agencies, and private organizations. Designed for 24/7 operations, the setup combines cutting-edge technology, ergonomic design, and reliable connectivity to enhance situational awareness, efficiency, and safety.',
            gradient: 'linear-gradient(135deg, #fafafa 0%, #d4d4d4 100%)',
            textColor: '#2d3748'
        },
        {
            id: 5,
            icon: 'pi pi-shield',
            title: 'Security Surveillance System',
            description:
                'Cloud-based security monitoring solution designed to ensure public safety, peace, and situational awareness across government and public environments. Our surveillance system provides 24/7 real-time video monitoring. AI analytics with a centralized management platform and two-way communication for swift and rapid response coordination.',
            gradient: 'linear-gradient(135deg, #f5f5f5 0%, #a3a3a3 100%)',
            textColor: '#2d3748'
        },
        {
            id: 6,
            icon: 'pi pi-sun',
            title: 'Solar Power and Renewable Energy System',
            description:
                'Provides reliable, efficient, and sustainable energy solutions for government clients, businesses, and institutions. Our systems are designed to reduce operational costs, improve energy independence, and support continuous power availability—allowing buildings to operate 24/7 without brownouts.',
            gradient: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
            textColor: '#2d3748'
        },
        {
            id: 7,
            icon: 'pi pi-lightbulb',
            title: 'Solar Street Lighting System (Smart Energy Infrastructure)',
            description:
                'Cost-effective and maintenance-free street lighting solution for urban, rural, and off-grid communities. Our solar lighting systems operate independently using solar energy, eliminating electricity costs and off-grid applications. Each unit combines high-efficiency LED lamps, durable solar panels, and intelligent lighting technology.',
            gradient: 'linear-gradient(135deg, #e5e5e5 0%, #a3a3a3 100%)',
            textColor: '#2d3748'
        },
        {
            id: 8,
            icon: 'pi pi-file-edit',
            title: 'Water Utility Read and Bill System (Water Service Management Platform)',
            description:
                'A comprehensive digital platform designed to automate the entire lifecycle of water utility management—from data capture to consumer billing and payment tracking. Integrated with smart water reading devices, the entire process from meter reading to collection to consumer billing and payment tracking.',
            gradient: 'linear-gradient(135deg, #fafafa 0%, #bdbdbd 100%)',
            textColor: '#2d3748'
        },
        {
            id: 9,
            icon: 'pi pi-users',
            title: 'School Management Suite (Digital Education Administration)',
            description:
                'An integrated digital platform designed to modernize and streamline the full spectrum of academic institutions—from elementary schools to universities. By centralizing student records, grades, attendance, schedules, and financial operations into one user-base platform, enabling schools to operate efficiently.',
            gradient: 'linear-gradient(135deg, #f5f5f5 0%, #a3a3a3 100%)',
            textColor: '#2d3748'
        },
        {
            id: 10,
            icon: 'pi pi-mobile',
            title: 'On-Demand Application Platform (Mobile App Build)',
            description:
                'Digital platforms designed to provide convenient, on-demand services anytime, anywhere, in real time. The platform enables businesses and governments to build based applications — all in a mobile-centric ecosystem. This on-demand solutions are engineered to deliver speed, reliability, and a seamless user experience.',
            gradient: 'linear-gradient(135deg, #ffffff 0%, #d4d4d4 100%)',
            textColor: '#2d3748'
        },
        {
            id: 11,
            icon: 'pi pi-home',
            title: 'Property Management System (Real Estate Admin)',
            description:
                'This system enables end-to-end property operations — from online reservations, room management, housekeeping scheduling to billing, invoicing, and reporting — all managed through one centralized dashboard. With its cloud-based architecture and mobile-first design, the system ensures speedy, agile property operations.',
            gradient: 'linear-gradient(135deg, #e5e5e5 0%, #bdbdbd 100%)',
            textColor: '#2d3748'
        }
    ];

    responsiveOptions = [
        { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
        { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
        { breakpoint: '768px', numVisible: 1, numScroll: 1 }
    ];

    ngOnInit() {
        this.checkScreenSize();
    }

    ngAfterViewInit() {
        // Increased delay and use requestAnimationFrame to ensure DOM is fully rendered
        this.observerSetupTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                this.setupIntersectionObserver();
            });
        }, 300);
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.elementObservers.forEach((observer) => observer.disconnect());
        if (this.observerSetupTimeout) {
            clearTimeout(this.observerSetupTimeout);
        }
    }

    setupIntersectionObserver() {
        // Clear any existing observers first
        this.elementObservers.forEach((observer) => observer.disconnect());
        this.elementObservers = [];

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        // Observer for header
        this.observeElement(
            '.header-animate',
            (isIntersecting) => {
                if (isIntersecting) {
                    this.isHeaderVisible = true;
                }
            },
            options
        );

        // Observer for carousel (desktop) or mobile cards
        if (!this.isMobile) {
            this.observeElement(
                '.carousel-animate',
                (isIntersecting) => {
                    if (isIntersecting) {
                        this.isCarouselVisible = true;
                        // Trigger indicators and counter after carousel
                        setTimeout(() => {
                            this.isIndicatorsVisible = true;
                        }, 400);
                        setTimeout(() => {
                            this.isCounterVisible = true;
                        }, 600);
                    }
                },
                options
            );
        } else {
            // Setup mobile card observers with a slight delay to ensure they're rendered
            setTimeout(() => {
                const mobileCards = document.querySelectorAll('.mobile-card');
                mobileCards.forEach((card, index) => {
                    const cardObserver = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.visibleMobileCards.add(index);
                            }
                        });
                    }, options);
                    cardObserver.observe(card);
                    this.elementObservers.push(cardObserver);
                });
            }, 200);
        }
    }

    private observeElement(selector: string, callback: (isIntersecting: boolean) => void, options: IntersectionObserverInit) {
        const element = document.querySelector(selector);
        if (element) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    callback(entry.isIntersecting);
                });
            }, options);
            observer.observe(element);
            this.elementObservers.push(observer);
        } else {
            console.warn(`Element with selector "${selector}" not found`);
        }
    }

    @HostListener('window:resize')
    onResize() {
        const wasMobile = this.isMobile;
        this.checkScreenSize();

        // If screen size changed between mobile and desktop, reset observers
        if (wasMobile !== this.isMobile) {
            this.resetAnimationStates();
            // Re-setup observers after a delay to allow for DOM updates
            if (this.observerSetupTimeout) {
                clearTimeout(this.observerSetupTimeout);
            }
            this.observerSetupTimeout = setTimeout(() => {
                requestAnimationFrame(() => {
                    this.setupIntersectionObserver();
                });
            }, 300);
        }
    }

    private resetAnimationStates() {
        this.isHeaderVisible = false;
        this.isCarouselVisible = false;
        this.isIndicatorsVisible = false;
        this.isCounterVisible = false;
        this.visibleMobileCards.clear();
    }

    checkScreenSize() {
        this.isMobile = window.innerWidth <= 768;
        this.numVisible = this.isMobile ? 1 : 3;
    }

    onPageChange(event: any) {
        this.currentPage = event.page;
    }

    getCenterCardId(): number {
        const centerOffset = Math.floor(this.numVisible / 2);
        const rawIndex = this.currentPage + centerOffset;
        const normalizedIndex = ((rawIndex % this.services.length) + this.services.length) % this.services.length;
        return this.services[normalizedIndex].id;
    }

    isCenterCard(service: Service): boolean {
        return service.id === this.getCenterCardId();
    }

    goToPage(serviceId: number): void {
        const centerOffset = Math.floor(this.numVisible / 2);
        let targetPage = serviceId - centerOffset;

        if (targetPage < 0) {
            targetPage = this.services.length + targetPage;
        }

        this.currentPage = targetPage;
    }

    onCardClick(service: Service): void {
        if (!this.isCenterCard(service)) {
            this.goToPage(service.id);
        }
    }

    getCenterCardIndex(): number {
        const centerOffset = Math.floor(this.numVisible / 2);
        const rawIndex = this.currentPage + centerOffset;
        return ((rawIndex % this.services.length) + this.services.length) % this.services.length;
    }

    isMobileCardVisible(index: number): boolean {
        return this.visibleMobileCards.has(index);
    }

    getMobileCardDelay(index: number): string {
        return `${0.1 + index * 0.1}s`;
    }
}
