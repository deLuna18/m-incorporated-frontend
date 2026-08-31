import { Component } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  template: `
    <footer class="public-site-footer" id="contact">
      <div class="footer-main">
        <div class="brand-column">
          <a class="brand" href="/" aria-label="M Incorporated home">
            <span class="brand-crown" aria-hidden="true">♛</span>
            <span class="brand-letter">M</span>
            <span class="brand-name">INCORPORATED</span>
            <span class="brand-subtitle">MODEL MANAGEMENT</span>
          </a>
          <p>Worldwide model and talent management for fashion, culture and creative industries.</p>
        </div>

        <nav aria-label="Agency links"><h2>Agency</h2><a href="/about">About us</a><a href="/services">Services</a><a href="/contact">Contact</a></nav>
        <nav aria-label="Talent links"><h2>Talent</h2><a href="/models">Our models</a><a href="/#become-model">Become a model</a><a href="/booking">Book a model</a></nav>
        <nav aria-label="Resources"><h2>Resources</h2><a href="/blog">Journal</a><a href="/gallery">Media gallery</a><a href="/contact">FAQs</a></nav>
        <div class="contact-column"><h2>Contact</h2><a href="mailto:hello&#64;m-incorporated.com">hello&#64;m-incorporated.com</a><a href="tel:+12125550988">+1 (212) 555 0988</a><p>New York, NY</p><div class="social-links" aria-label="Social media"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="TikTok">TT</a></div></div>
      </div>
      <div class="footer-bottom"><span>© 2026 M Incorporated. All rights reserved.</span><a href="/contact">Get in touch <span aria-hidden="true">→</span></a></div>
    </footer>
  `,
  styles: [`
    :host { display: block; font-family: Inter, sans-serif; }
    .public-site-footer { background: #111; border-top: 4px solid #fff; color: #fff; margin-top: clamp(2.5rem, 5vw, 4.5rem); padding: 3.25rem clamp(1.5rem, 5vw, 5rem) 1.25rem; }
    .footer-main { display: grid; gap: 2rem; grid-template-columns: minmax(15rem, 1.55fr) repeat(3, minmax(8rem, .8fr)) minmax(13rem, 1.1fr); margin: 0 auto; max-width: 1680px; }
    .brand { color: inherit; display: flex; flex-direction: column; text-decoration: none; width: fit-content; }
    .brand-crown { color: #fff; font-size: 1.05rem; line-height: .8; }
    .brand-letter { font-size: 3.5rem; font-weight: 500; line-height: .72; letter-spacing: -.08em; }
    .brand-name { font-size: .62rem; font-weight: 700; letter-spacing: .28em; margin-top: .8rem; }
    .brand-subtitle { color: #bababa; font-size: .56rem; letter-spacing: .22em; margin-top: .42rem; }
    .brand-column > p { color: #c5c5c5; font-size: .78rem; line-height: 1.65; margin: 1.45rem 0 0; max-width: 17rem; }
    h2 { color: #fff; font-size: .6rem; font-weight: 700; letter-spacing: .18em; margin: 0 0 1.1rem; text-transform: uppercase; }
    nav, .contact-column { display: flex; flex-direction: column; align-items: flex-start; gap: .7rem; }
    nav a, .contact-column > a, .contact-column > p { color: #f5f5f5; font-size: .76rem; line-height: 1.35; margin: 0; text-decoration: none; }
    nav a:hover, .contact-column > a:hover, .footer-bottom a:hover { color: #bbb; }
    .social-links { display: flex; gap: .55rem; margin-top: .75rem; }
    .social-links a { align-items: center; border: 1px solid #777; border-radius: 50%; color: #fff; display: inline-flex; font-size: .63rem; font-weight: 700; height: 2rem; justify-content: center; text-decoration: none; width: 2rem; }
    .social-links a:hover { background: #fff; border-color: #fff; color: #111; }
    .footer-bottom { border-top: 1px solid #444; color: #aaa; display: flex; font-size: .68rem; justify-content: space-between; letter-spacing: .04em; margin: 2.75rem auto 0; max-width: 1680px; padding-top: 1.2rem; }
    .footer-bottom a { color: #fff; font-weight: 700; text-decoration: none; }
    .footer-bottom a span { color: #fff; font-size: 1.1rem; margin-left: .35rem; }
    @media (max-width: 900px) { .footer-main { grid-template-columns: repeat(2, minmax(0, 1fr)); } .brand-column { grid-column: 1 / -1; } }
    @media (max-width: 560px) { .public-site-footer { margin-top: 2rem; padding-top: 2.5rem; } .footer-main { grid-template-columns: 1fr; gap: 2rem; } .brand-column { grid-column: auto; } .footer-bottom { align-items: flex-start; flex-direction: column; gap: .85rem; margin-top: 2.25rem; } }
  `]
})
export class PublicFooterComponent {}
