import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'about-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutWidget implements AfterViewInit, OnDestroy {
    // Path to your image - adjust if needed
    imageSource = 'assets/img/why-us-illustration.png';

    // Animation states
    isTitleVisible: boolean = false;
    isOrangeBarVisible: boolean = false;
    isHeadingVisible: boolean = false;
    isDescriptionVisible: boolean = false;
    isButtonVisible: boolean = false;
    isImageVisible: boolean = false;

    private elementObservers: IntersectionObserver[] = [];

    ngAfterViewInit() {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            this.setupIntersectionObserver();
        }, 100);
    }

    ngOnDestroy() {
        this.elementObservers.forEach((observer) => observer.disconnect());
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        // Observer for title
        const titleElement = document.querySelector('.title-animate');
        if (titleElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.isTitleVisible = true;
                    }
                });
            }, options);
            observer.observe(titleElement);
            this.elementObservers.push(observer);
        }

        // Observer for orange bar
        const orangeBarElement = document.querySelector('.orange-bar-animate');
        if (orangeBarElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.isOrangeBarVisible = true;
                        }, 200);
                    }
                });
            }, options);
            observer.observe(orangeBarElement);
            this.elementObservers.push(observer);
        }

        // Observer for main heading
        const headingElement = document.querySelector('.heading-animate');
        if (headingElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.isHeadingVisible = true;
                        }, 400);
                    }
                });
            }, options);
            observer.observe(headingElement);
            this.elementObservers.push(observer);
        }

        // Observer for description
        const descriptionElement = document.querySelector('.description-animate');
        if (descriptionElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.isDescriptionVisible = true;
                        }, 600);
                    }
                });
            }, options);
            observer.observe(descriptionElement);
            this.elementObservers.push(observer);
        }

        // Observer for button
        const buttonElement = document.querySelector('.button-animate');
        if (buttonElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.isButtonVisible = true;
                        }, 800);
                    }
                });
            }, options);
            observer.observe(buttonElement);
            this.elementObservers.push(observer);
        }

        // Observer for image
        const imageElement = document.querySelector('.image-animate');
        if (imageElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.isImageVisible = true;
                        }, 400);
                    }
                });
            }, options);
            observer.observe(imageElement);
            this.elementObservers.push(observer);
        }
    }
}
