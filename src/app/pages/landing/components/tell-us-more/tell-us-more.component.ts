import { Component, OnInit, OnDestroy, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
    selector: 'tell-us-more-widget',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, RippleModule, InputTextModule, InputTextModule, DropdownModule],
    templateUrl: './tell-us-more.component.html',
    styleUrls: ['./tell-us-more.component.scss']
})
export class TellUsMoreWidget implements OnInit, OnDestroy {
    projectForm!: FormGroup;
    imageSource = 'assets/img/illustration2.jpg';
    isSubmitting = false;

    projectCategories = [
        { label: 'Web Development', value: 'web-development' },
        { label: 'Mobile App Development', value: 'mobile-development' },
        { label: 'UI/UX Design', value: 'ui-ux-design' },
        { label: 'Cloud Solutions', value: 'cloud-solutions' },
        { label: 'AI/ML Solutions', value: 'ai-ml-solutions' },
        { label: 'DevOps & Infrastructure', value: 'devops' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Other', value: 'other' }
    ];

    private observer?: IntersectionObserver;

    // EmailJS Configuration
    private readonly EMAILJS_PUBLIC_KEY = 'jzLyDknUer8TVV2aU';
    private readonly EMAILJS_SERVICE_ID = 'service_bslo8yr';
    private readonly EMAILJS_TEMPLATE_ID = 'template_0qew2jl';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit() {
        this.initForm();

        // Initialize EmailJS
        emailjs.init(this.EMAILJS_PUBLIC_KEY);

        if (isPlatformBrowser(this.platformId)) {
            this.setupScrollAnimation();
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private initForm() {
        this.projectForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            contactNumber: ['', [Validators.required]],
            projectCategory: ['', [Validators.required]],
            projectDescription: ['', [Validators.required]],
            timeline: ['']
        });
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

        const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el: Element) => {
            this.observer?.observe(el);
        });
    }

    async onSubmit() {
        if (this.projectForm.invalid) {
            // Mark all fields as touched to show validation errors
            Object.keys(this.projectForm.controls).forEach((key) => {
                this.projectForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isSubmitting = true;

        try {
            const formValues = this.projectForm.value;

            // Get the label for the selected project category
            const selectedCategory = this.projectCategories.find((cat) => cat.value === formValues.projectCategory);

            // Prepare template parameters for EmailJS
            const templateParams = {
                to_email: 'info.vicirotechnologies@gmail.com',
                from_name: formValues.fullName,
                from_email: formValues.email,
                contact_number: formValues.contactNumber,
                project_category: selectedCategory?.label || formValues.projectCategory,
                project_description: formValues.projectDescription,
                timeline: formValues.timeline || 'Not specified',
                reply_to: formValues.email
            };

            // Send email using EmailJS
            const response = await emailjs.send(this.EMAILJS_SERVICE_ID, this.EMAILJS_TEMPLATE_ID, templateParams);

            console.log('Email sent successfully!', response);
            alert('Thank you! Your project inquiry has been submitted successfully. Our team will contact you within one business day.');

            // Reset form
            this.projectForm.reset();
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Oops! Something went wrong. Please try again later or contact us directly at info.vicirotechnologies@gmail.com');
        } finally {
            this.isSubmitting = false;
        }
    }
}
