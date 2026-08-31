import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarWidget } from '../../pages/landing/components/topbar/topbar.component';
import { PublicFooterComponent } from '../public-footer/public-footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, TopbarWidget, PublicFooterComponent],
  template: `<div class="public-site"><topbar-widget /><main class="public-route-content"><router-outlet /></main><app-public-footer /></div>`
})
export class PublicLayoutComponent {}
