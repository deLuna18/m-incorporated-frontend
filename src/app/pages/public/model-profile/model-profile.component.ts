import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Model {
  slug: string;
  name: string;
  location: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-model-profile',
  standalone: true,
  templateUrl: './model-profile.component.html',
  styleUrl: './model-profile.component.scss'
})
export class ModelProfileComponent implements AfterViewInit {
  private readonly models: Model[] = [
    ['luna-martinez', 'Luna Martinez', 'NEW YORK', 'WOMEN · COMMERCIAL', '1524504388940-b1c1722653e1'], ['noah-valentino', 'Noah Valentino', 'MILAN', 'MEN', '1506794778202-cad84cf45f1d'], ['ella-roberts', 'Ella Roberts', 'PARIS', 'WOMEN · COMMERCIAL', '1529139574466-a303027c1d8b'], ['jordan-reid', 'Jordan Reid', 'LONDON', 'MEN · COMMERCIAL', '1507003211169-0a1dd7228f2d'], ['mia-laurent', 'Mia Laurent', 'PARIS', 'WOMEN · NEW FACE', '1524250502761-1ac6f2e30d43'], ['elias-ward', 'Elias Ward', 'LONDON', 'MEN · NEW FACE', '1500648767791-00dcc994a43e'], ['sora-kim', 'Sora Kim', 'SEOUL', 'WOMEN · CREATOR', '1517841905240-472988babdf9'], ['theo-rossi', 'Theo Rossi', 'MILAN', 'MEN · NEW FACE', '1519085360753-af0119f7cbe7'], ['amara-okafor', 'Amara Okafor', 'LONDON', 'WOMEN · COMMERCIAL', '1531123897727-8f129e1688ce'], ['mateo-cruz', 'Mateo Cruz', 'NEW YORK', 'MEN · CREATOR', '1504593811423-6dd665756598'], ['clara-moreau', 'Clara Moreau', 'PARIS', 'WOMEN · COMMERCIAL', '1485968579580-b6d095142e6'], ['jin-park', 'Jin Park', 'SEOUL', 'MEN · CREATOR', '1521119989659-a83eee488004'], ['ava-sinclair', 'Ava Sinclair', 'NEW YORK', 'WOMEN · COMMERCIAL', '1534528741775-53994a69daeb'], ['leo-moretti', 'Leo Moretti', 'MILAN', 'MEN · COMMERCIAL', '1531384441138-2736e62e0919'], ['camille-duval', 'Camille Duval', 'PARIS', 'WOMEN · CREATOR', '1531123897727-8f129e1688ce'], ['adrian-cole', 'Adrian Cole', 'LONDON', 'MEN · COMMERCIAL', '1501196354995-cbb51c65aaea'], ['yuna-choi', 'Yuna Choi', 'SEOUL', 'WOMEN · NEW FACE', '1544725176-7c40e5a71c5e'], ['nico-bellini', 'Nico Bellini', 'MILAN', 'MEN · NEW FACE', '1506277886164-e25aa3f4ef7f'], ['elena-voss', 'Elena Voss', 'LONDON', 'WOMEN · COMMERCIAL', '1488426862026-3ee34a7d66df'], ['kai-nakamura', 'Kai Nakamura', 'SEOUL', 'MEN · CREATOR', '1519345182560-3f2917c472ef'], ['sofia-marin', 'Sofia Marin', 'NEW YORK', 'WOMEN · COMMERCIAL', '1517365830460-955ce3ccd263'], ['julien-marchand', 'Julien Marchand', 'PARIS', 'MEN · COMMERCIAL', '1524504388940-b1c1722653e1'], ['aria-bennett', 'Aria Bennett', 'LONDON', 'WOMEN · NEW FACE', '1524250502761-1ac6f2e30d43'], ['marco-leone', 'Marco Leone', 'MILAN', 'MEN · COMMERCIAL', '1521119989659-a83eee488004'], ['isla-hart', 'Isla Hart', 'NEW YORK', 'WOMEN · CREATOR', '1494790108377-be9c29b29330'], ['daniel-seo', 'Daniel Seo', 'SEOUL', 'MEN · NEW FACE', '1519085360753-af0119f7cbe7'], ['louise-garnier', 'Louise Garnier', 'PARIS', 'WOMEN · COMMERCIAL', '1529626455594-4ff0802cfb7e'], ['hugo-laurent', 'Hugo Laurent', 'PARIS', 'MEN · CREATOR', '1506794778202-cad84cf45f1d'], ['maya-collins', 'Maya Collins', 'NEW YORK', 'WOMEN · NEW FACE', '1529139574466-a303027c1d8b'], ['lorenzo-ricci', 'Lorenzo Ricci', 'MILAN', 'MEN · COMMERCIAL', '1507003211169-0a1dd7228f2d'], ['nina-foster', 'Nina Foster', 'LONDON', 'WOMEN · COMMERCIAL', '1517841905240-472988babdf9'], ['ethan-blake', 'Ethan Blake', 'NEW YORK', 'MEN · COMMERCIAL', '1500648767791-00dcc994a43e']
  ].map(([slug, name, location, category, image]) => ({ slug, name, location, category, image: `https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=1600&q=90` }));

  constructor(private readonly host: ElementRef<HTMLElement>, private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe((params) => this.renderProfile(params.get('model') ?? 'luna-martinez'));
  }

  onClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    const menuButton = target?.closest('#menuBtn') as HTMLButtonElement | null;
    if (menuButton) {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.textContent = isOpen ? 'MENU' : 'CLOSE';
      this.root.querySelector('#mobileNav')?.classList.toggle('hidden', isOpen);
      return;
    }
    const related = target?.closest<HTMLAnchorElement>('[data-related-model]');
    if (related) {
      event.preventDefault();
      this.router.navigate(['/model-profile'], { queryParams: { model: related.dataset['relatedModel'] } });
    }
  }

  private get root(): HTMLElement { return this.host.nativeElement; }

  private renderProfile(slug: string): void {
    const index = Math.max(0, this.models.findIndex((model) => model.slug === slug));
    const model = this.models[index];
    const isMen = model.category.includes('MEN');
    document.title = `${model.name} — M Incorporated`;
    this.text('#modelName', model.name); this.text('#modelLocation', model.location); this.text('#modelCategory', model.category);
    this.text('#bookingHeading', `Interested in working with ${model.name}?`);
    this.text('#modelBio', `${model.name} is represented by M Incorporated and based in ${this.titleCase(model.location)}. With a distinctive presence across ${model.category.toLowerCase().replace(' · ', ', ')}, ${isMen ? 'he' : 'she'} brings a considered, contemporary point of view to editorial, commercial and creative projects worldwide.`);
    this.image('#heroImage', model.image, `${model.name} model portrait`); this.image('#portfolioHero', model.image, `${model.name} portfolio portrait`);
    this.root.querySelectorAll<HTMLImageElement>('[data-profile-image]').forEach((image) => {
      image.src = model.image;
      image.alt = `${model.name} portfolio image`;
    });
    this.root.querySelectorAll<HTMLAnchorElement>('[data-booking]').forEach((link) => link.href = `/booking?model=${model.slug}`);
    this.renderMeasurements(model, isMen); this.renderRelated(index);
  }

  private renderMeasurements(model: Model, isMen: boolean): void {
    const seed = [...model.slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const values = model.slug === 'ava-sinclair'
      ? [['HEIGHT', '179 CM'], ['BUST', '86 CM'], ['WAIST', '62 CM'], ['HIPS', '90 CM'], ['SHOES', '40 EU'], ['HAIR / EYES', 'BROWN / HAZEL']]
      : isMen
        ? [['HEIGHT', `${184 + seed % 7} CM`], ['CHEST', `${92 + seed % 7} CM`], ['WAIST', `${76 + seed % 7} CM`], ['SUIT', `${46 + seed % 4 * 2}`], ['SHOES', `${42 + seed % 3} EU`], ['HAIR / EYES', 'BROWN / HAZEL']]
        : [['HEIGHT', `${174 + seed % 7} CM`], ['BUST', `${80 + seed % 7} CM`], ['WAIST', `${58 + seed % 7} CM`], ['HIPS', `${86 + seed % 7} CM`], ['SHOES', `${37 + seed % 4} EU`], ['HAIR / EYES', 'BROWN / HAZEL']];
    const container = this.root.querySelector('#measurements');
    if (container) container.innerHTML = values.map(([label, value]) => `<div><p class="text-[9px] font-semibold tracking-[.15em] text-muted">${label}</p><p class="mt-2 text-[17px] font-medium leading-none">${value}</p></div>`).join('');
  }

  private renderRelated(index: number): void {
    const related = [1, 2, 3, 4].map((step) => this.models[(index + step) % this.models.length]);
    const container = this.root.querySelector('#relatedModels');
    if (container) container.innerHTML = related.map((model) => `<a href="/model-profile?model=${model.slug}" data-related-model="${model.slug}" class="group block"><div class="aspect-[.9/1] overflow-hidden bg-neutral-200"><img src="${model.image}" alt="${model.name}" class="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]" /></div><div class="pt-3"><h3 class="font-serif text-[26px] leading-none tracking-[-.025em]">${model.name}</h3><div class="mt-2 flex flex-wrap items-center gap-x-9 gap-y-2 text-[7px] font-semibold tracking-[.13em] text-muted"><span>${model.location}</span><span>${model.category}</span></div></div></a>`).join('');
  }

  private text(selector: string, value: string): void { const element = this.root.querySelector(selector); if (element) element.textContent = value; }
  private image(selector: string, source: string, alt: string): void { const image = this.root.querySelector<HTMLImageElement>(selector); if (image) { image.src = source; image.alt = alt; } }
  private titleCase(value: string): string { return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); }

}
