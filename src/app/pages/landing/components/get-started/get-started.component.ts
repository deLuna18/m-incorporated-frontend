import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { HowGetStartedWidget } from '../how-get-started/how-get-started.component';
import { TellUsMoreWidget } from '../tell-us-more/tell-us-more.component';

@Component({
    selector: 'get-started-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, HowGetStartedWidget, TellUsMoreWidget],
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss']
})
export class GetStartedWidget {
    constructor(private router: Router) {}

    goBack() {
        this.router.navigate(['/']);
    }
}
