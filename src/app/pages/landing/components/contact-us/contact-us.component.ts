import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import emailjs from '@emailjs/browser';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface SocialLink {
    icon: string;
    label: string;
    url: string;
}

interface NavLink {
    label: string;
    fragment: string;
}

@Component({
    selector: 'contact-us-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputTextModule, RippleModule],
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsWidget implements OnInit {
    logo = 'assets/img/logo1.png';

    contactForm: ContactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    isSubmitting = false;

    navLinks: NavLink[] = [
        { label: 'Home', fragment: 'hero-widget' },
        { label: 'Services', fragment: 'services-widget' },
        { label: 'About', fragment: 'about-widget' },
        { label: 'Why Us', fragment: 'why-us-widget' },
        { label: 'Methodology', fragment: 'ways-of-developing-widget' },
        { label: 'Development Works', fragment: 'development-ways-widget' },
        { label: 'Projects', fragment: 'projects-widget' }
    ];

    socialLinks: SocialLink[] = [
        { icon: 'pi-facebook', label: 'Facebook', url: '#' },
        { icon: 'pi-instagram', label: 'Instagram', url: '#' },
        { icon: 'pi-twitter', label: 'Twitter', url: '#' },
        { icon: 'pi-linkedin', label: 'LinkedIn', url: '#' }
    ];

    // EmailJS Configuration
    private readonly EMAILJS_PUBLIC_KEY = 'jzLyDknUer8TVV2aU'; // Get from EmailJS dashboard
    private readonly EMAILJS_SERVICE_ID = 'service_bslo8yr'; // Get from EmailJS dashboard
    private readonly EMAILJS_TEMPLATE_ID = 'template_0vpe53f'; // Get from EmailJS dashboard

    ngOnInit(): void {
        // Initialize EmailJS with your public key
        emailjs.init(this.EMAILJS_PUBLIC_KEY);
    }

    async onSubmit(): Promise<void> {
        if (!this.isFormValid()) {
            return;
        }

        this.isSubmitting = true;

        try {
            // Prepare template parameters
            const templateParams = {
                name: this.contactForm.name,
                email: this.contactForm.email,
                title: this.contactForm.subject,
                message: this.contactForm.message || 'No message provided'
            };

            // Send email using EmailJS
            const response = await emailjs.send(this.EMAILJS_SERVICE_ID, this.EMAILJS_TEMPLATE_ID, templateParams);

            console.log('Email sent successfully!', response);
            alert('Thank you! Your message has been sent successfully.');
            this.resetForm();
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Oops! Something went wrong. Please try again later.');
        } finally {
            this.isSubmitting = false;
        }
    }

    scrollToSection(fragment: string): void {
        const element = document.getElementById(fragment);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    private isFormValid(): boolean {
        return !!(this.contactForm.name && this.contactForm.email && this.contactForm.subject);
    }

    private resetForm(): void {
        this.contactForm = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }
}
