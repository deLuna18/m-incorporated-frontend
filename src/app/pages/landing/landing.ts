import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FooterWidget } from './components/footerwidget';
import { TopbarWidget } from './components/topbar/topbar.component';
import { HeroWidget } from './components/home/home.component';
import { ServicesWidget } from './components/services/services.component';
import { AboutWidget } from './components/about/about.component';
import { WhyUsWidget } from './components/why-us/why-us.component';
import { ProjectsWidget } from './components/projects/projects.component';
import { ContactUsWidget } from './components/contact-us/contact-us.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, HeroWidget, ServicesWidget, AboutWidget, WhyUsWidget, ContactUsWidget, ProjectsWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="w-full !bg-transparent" />
                <div id="hero-widget">
                    <hero-widget />
                </div>
                <div id="services-widget">
                    <services-widget />
                </div>
                <div id="about-widget">
                    <about-widget />
                </div>
                <div id="why-us-widget">
                    <why-us-widget />
                </div>
                <div id="projects-widget">
                    <projects-widget />
                </div>
                <div id="contact-us-widget">
                    <contact-us-widget />
                </div>
                <div id="contact-us">
                    <footer-widget />
                </div>
            </div>
        </div>
    `
})
export class Landing {}
