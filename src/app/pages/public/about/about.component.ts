import { Component } from '@angular/core';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';

@Component({
  selector: 'app-about',
  imports: [TopbarWidget],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

}
