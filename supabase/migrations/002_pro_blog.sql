-- Add pro_only flag to blog posts (gated early-access content)
alter table public.blog_posts
  add column if not exists pro_only boolean not null default false;

-- Allow authenticated users to see all blog posts (including pro ones)
-- Public only sees non-pro posts
drop policy if exists "Published blog posts are public" on public.blog_posts;

create policy "Published blog posts are public" on public.blog_posts
  for select using (published = true and pro_only = false);

create policy "Pro users can see all published blog posts" on public.blog_posts
  for select using (
    published = true and auth.role() = 'authenticated'
  );

-- Admins can do everything
create policy "Service role full access to blog posts" on public.blog_posts
  for all using (true) with check (true);
