import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private readonly host: ElementRef<HTMLElement>) {}

  toggleMenu(): void {
    const menu = this.root.querySelector('#mobileNav');
    const button = this.root.querySelector<HTMLButtonElement>('#menuBtn');
    const isOpen = !menu?.classList.contains('hidden');
    menu?.classList.toggle('hidden', isOpen);
    button?.setAttribute('aria-expanded', String(!isOpen));
    if (button) button.textContent = isOpen ? 'MENU' : 'CLOSE';
  }

  submit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.classList.add('hidden');
    this.root.querySelector('#successState')?.classList.remove('hidden');
  }

  sendAnother(): void {
    const form = this.root.querySelector<HTMLFormElement>('#contactForm');
    form?.reset(); form?.classList.remove('hidden');
    this.root.querySelector('#successState')?.classList.add('hidden');
  }

  private get root(): HTMLElement { return this.host.nativeElement; }
}
