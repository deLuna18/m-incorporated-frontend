import { Component } from '@angular/core';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';
import { PublicFooterComponent } from '../../../shared-component/public-footer/public-footer.component';

@Component({
  selector: 'app-about',
  imports: [TopbarWidget, PublicFooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

}
