import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HeroWidget {
    constructor(private router: Router) {}

    navigateToModels(): void {
        this.router.navigate(['/models']);
    }

    navigateToBooking(): void {
        this.router.navigate(['/booking']);
    }
}
