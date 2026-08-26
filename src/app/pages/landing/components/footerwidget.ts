import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    template: `
        <div class="w-full">
            <div class="flex items-center justify-center py-4 px-4">
                <p class="text-gray-600 text-xs sm:text-sm text-center">© 2025 Copyright by VICIRO Technologies Inc., All rights reserved.</p>
            </div>
        </div>
    `
})
export class FooterWidget {
    constructor(public router: Router) {}
}
