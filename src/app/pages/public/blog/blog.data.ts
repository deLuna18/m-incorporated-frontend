export interface BlogPost {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
    { slug: 'lorem-ipsum-dolor-sit-amet', category: 'Editorial', title: 'Lorem ipsum dolor sit amet', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', author: 'M Incorporated', date: 'August 18, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85', body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'] },
    { slug: 'consectetur-adipiscing-elit', category: 'Talent', title: 'Consectetur adipiscing elit', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', author: 'M Incorporated', date: 'August 5, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1400&q=85', body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'] },
    { slug: 'sed-do-eiusmod-tempor', category: 'Bookings', title: 'Sed do eiusmod tempor', excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', author: 'M Incorporated', date: 'July 21, 2026', readTime: '3 min read', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85', body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi morbi tempus iaculis urna id volutpat.', 'Nunc sed augue lacus viverra vitae congue eu consequat ac felis.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'] },
    { slug: 'ut-enim-ad-minim-veniam', category: 'Agency', title: 'Ut enim ad minim veniam', excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', author: 'M Incorporated', date: 'July 2, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', body: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.', 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.'] }
];
