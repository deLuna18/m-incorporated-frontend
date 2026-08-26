import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { WaysOfDevelopingWidget } from '../ways-of-developing/ways-of-developing.component';
import { DevelopmentWaysWidget } from '../development-ways/development-ways.component';

interface CoreValue {
    title: string;
    description: string;
    icon: string;
}

interface MultiTeam {
    title: string;
    description: string;
    icon: string;
}

interface Expertise {
    title: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'why-us-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommonModule, WaysOfDevelopingWidget, DevelopmentWaysWidget],
    templateUrl: './why-us.component.html',
    styleUrls: ['./why-us.component.scss']
})
export class WhyUsWidget {
    logos = [
        { src: 'assets/img/lg1.png', alt: 'Partner 1' },
        { src: 'assets/img/lg2.png', alt: 'Partner 2' },
        { src: 'assets/img/lg3.png', alt: 'Partner 3' },
        { src: 'assets/img/lg4.png', alt: 'Partner 4' },
        { src: 'assets/img/lg6.png', alt: 'Partner 6' },
        { src: 'assets/img/lg7.png', alt: 'Partner 7' },
        { src: 'assets/img/lg8.png', alt: 'Partner 8' },
        { src: 'assets/img/lg9.png', alt: 'Partner 9' },
        { src: 'assets/img/lg10.png', alt: 'Partner 10' },
        { src: 'assets/img/lg11.png', alt: 'Partner 11' },
        { src: 'assets/img/lg12.png', alt: 'Partner 12' }
    ];

    activeTab: string = 'core-value';

    coreValues: CoreValue[] = [
        {
            title: 'Excellence in Execution',
            description: 'We deliver high-quality solutions with precision, discipline, and technical mastery—because details matter.',
            icon: 'pi-trophy'
        },
        {
            title: 'Innovation with Purpose',
            description: 'We design technology that empowers, not distracts, drives progress, and creates measurable impact for our clients.',
            icon: 'pi-lightbulb'
        },
        {
            title: 'Reliability & Security',
            description: 'We engineer digital systems with robust, layered protection, ensuring uptime, and supporting business continuity.',
            icon: 'pi-shield'
        },
        {
            title: 'Integrity & Accountability',
            description: 'We commit to transparency, honesty, and responsibility in every project, ensuring trust and long-term partnerships.',
            icon: 'pi-check-circle'
        },
        {
            title: 'Client-Centric Collaboration',
            description: 'We listen, understand, and work closely with clients to build solutions tailored to their goals and operational realities.',
            icon: 'pi-users'
        },
        {
            title: 'Continuous Learning & Growth',
            description: 'We cultivate a culture of curiosity and knowledge-sharing, ensuring our team remains skilled and future-ready.',
            icon: 'pi-chart-line'
        }
    ];

    multiteam: MultiTeam[] = [
        {
            title: 'Agile Project Management ',
            description:
                'Ensures that every project — whether in IT development, engineering, or digital transformation — is executed with efficiency, transparency, and adaptability. Through Agile methodologies such as Scrum and Kanban, our team embraces continuous improvement, client collaboration, and rapid iteration to deliver high-quality results on time and within scope.',
            icon: 'pi-sync'
        },
        {
            title: 'ITIL Certified Professional',
            description:
                'Ensure that every stage of the IT service lifecycle — from strategy and design to transition, operation, and continual improvement — is aligned with best practices that enhance efficiency, reliability, and customer satisfaction.',
            icon: 'pi-cog'
        },
        {
            title: 'Lean Six Sigma Certified',
            description: 'Specializes in applying data-driven methodologies and continuous improvement principles to optimize business processes, reduce waste, and enhance overall service quality.',
            icon: 'pi-chart-line'
        },
        {
            title: 'Project Management Professional',
            description: 'Specializes in applying data-driven methodologies and continuous improvement principles to optimize business processes, reduce waste, and enhance overall service quality.',
            icon: 'pi-briefcase'
        }
    ];

    expertise: Expertise[] = [
        {
            title: 'Software & Desktop Development',
            description:
                'Brings 25 years of professional experience in Software and Desktop Development, specializing in system design, programming, and deployment of enterprise-grade applications, solutions tailored to client needs across various industries.',
            icon: 'pi-code'
        },
        {
            title: 'Local Government System Services',
            description: 'Over 15 years of proven experience in Local Government System Services Management, supporting digital transformation and automation for LGUs — from e-governance solutions to digital workflows and reporting compliance.',
            icon: 'pi-building'
        },
        {
            title: 'Infrastructure & Mobile Development',
            description:
                'With 10 years of technical experience in CCTV, Fiber Optic Infrastructure, and Mobile Application Development, combining expertise in physical network setup, security surveillance integration, and mobile system deployment for end-to-end digital solutions.',
            icon: 'pi-wifi'
        }
    ];
}
