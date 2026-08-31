import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';
import { PublicFooterComponent } from '../../../shared-component/public-footer/public-footer.component';
import { BLOG_POSTS } from './blog.data';

@Component({
    selector: 'app-blog-article',
    standalone: true,
    imports: [CommonModule, RouterLink, TopbarWidget, PublicFooterComponent],
    template: `
        <topbar-widget />
        @if (post; as article) {<main class="bg-white text-black"><section class="mx-auto max-w-4xl px-5 pb-12 pt-14 sm:px-8 lg:pb-16 lg:pt-20"><a routerLink="/blog" class="text-[9px] font-semibold tracking-[.18em]">← ALL POSTS</a><p class="mt-12 text-[10px] font-semibold tracking-[.22em]">{{ article.category | uppercase }}</p><h1 class="mt-5 font-serif text-[56px] font-medium leading-[.88] tracking-[-.05em] sm:text-[76px]">{{ article.title }}</h1><p class="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">{{ article.excerpt }}</p><div class="mt-9 flex gap-5 text-[9px] font-semibold tracking-[.14em]"><span>{{ article.date }}</span><span>·</span><span>{{ article.readTime }}</span><span>·</span><span>{{ article.author }}</span></div></section><section class="mx-auto max-w-[1200px] px-5 sm:px-8"><div class="aspect-[16/9] overflow-hidden bg-neutral-100"><img [src]="article.image" [alt]="article.title" class="h-full w-full object-cover" /></div></section><section class="mx-auto max-w-2xl px-5 py-14 sm:px-8 lg:py-20">@for (paragraph of article.body; track paragraph) {<p class="mb-7 text-[17px] leading-8 text-neutral-700">{{ paragraph }}</p>}<div class="mt-12 border-y border-black py-7"><p class="text-[9px] font-semibold tracking-[.18em]">M INCORPORATED BLOG</p><p class="mt-3 font-serif text-3xl">Thoughtful perspectives on talent and creative work.</p></div></section></main>} @else {<main class="grid min-h-[60vh] place-items-center bg-white p-8 text-center"><div><h1 class="font-serif text-5xl">Post not found</h1><a routerLink="/blog" class="mt-6 inline-block border border-black px-6 py-3 text-[9px] font-semibold tracking-[.16em]">RETURN TO BLOG</a></div></main>}
        <app-public-footer />
    `
})
export class BlogArticleComponent {
    readonly post = BLOG_POSTS.find((post) => post.slug === this.route.snapshot.paramMap.get('slug'));
    constructor(private readonly route: ActivatedRoute) {}
}
