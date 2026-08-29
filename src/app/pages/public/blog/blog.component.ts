import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopbarWidget } from '../../landing/components/topbar/topbar.component';
import { BLOG_POSTS } from './blog.data';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, RouterLink, TopbarWidget],
    template: `
        <topbar-widget />
        <main class="mt-5 bg-white text-black lg:mt-7">
            <section class="border-b border-black"><div class="mx-auto grid max-w-[1680px] gap-7 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:px-14 lg:py-16 xl:px-16"><div><p class="text-[9px] font-semibold tracking-[.22em]">M INCORPORATED BLOG</p><h1 class="mt-4 font-serif text-[54px] font-medium leading-[.9] tracking-[-.045em] sm:text-[66px] lg:text-[74px]">Lorem ipsum<br>dolor sit amet.</h1></div><p class="max-w-md text-[12px] leading-6 text-neutral-600 lg:mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></div></section>
            <section class="mx-auto max-w-[1680px] px-5 py-10 sm:px-8 lg:px-14 lg:py-14 xl:px-16"><a [routerLink]="['/blog', posts[0].slug]" class="group grid overflow-hidden border border-black lg:grid-cols-[1.1fr_.9fr]"><div class="aspect-[4/3] overflow-hidden bg-neutral-100"><img [src]="posts[0].image" [alt]="posts[0].title" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><div class="flex flex-col justify-between p-6 sm:p-8 lg:p-10"><div><p class="text-[8px] font-semibold tracking-[.18em]">FEATURED · {{ posts[0].category | uppercase }}</p><h2 class="mt-5 font-serif text-[38px] leading-[.94] tracking-[-.035em] sm:text-[46px]">{{ posts[0].title }}</h2><p class="mt-5 max-w-md text-[12px] leading-6 text-neutral-600">{{ posts[0].excerpt }}</p></div><div class="mt-8 flex items-center justify-between border-t border-black pt-4 text-[8px] font-semibold tracking-[.14em]"><span>{{ posts[0].date }}</span><span>READ ARTICLE →</span></div></div></a></section>
            <section class="mx-auto max-w-[1680px] px-5 pb-16 sm:px-8 lg:px-14 lg:pb-20 xl:px-16"><div class="mb-7 flex items-center justify-between border-b border-black pb-4"><h2 class="font-serif text-[34px]">Latest articles</h2><span class="text-[8px] font-semibold tracking-[.16em]">{{ posts.length - 1 }} POSTS</span></div><div class="grid gap-x-5 gap-y-10 md:grid-cols-3">@for (post of posts.slice(1); track post.slug) {<article><a [routerLink]="['/blog', post.slug]" class="group block"><div class="aspect-[4/3] overflow-hidden bg-neutral-100"><img [src]="post.image" [alt]="post.title" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><p class="mt-4 text-[8px] font-semibold tracking-[.16em]">{{ post.category | uppercase }}</p><h3 class="mt-3 font-serif text-[30px] leading-[.95] tracking-[-.03em]">{{ post.title }}</h3><p class="mt-3 text-[11px] leading-5 text-neutral-600">{{ post.excerpt }}</p><div class="mt-4 flex justify-between text-[8px] font-semibold tracking-[.13em]"><span>{{ post.date }}</span><span>READ →</span></div></a></article>}</div></section>
        </main>
    `
})
export class BlogComponent { readonly posts = BLOG_POSTS; }
