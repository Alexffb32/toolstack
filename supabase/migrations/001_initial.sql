-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'individual', 'enterprise')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text default 'inactive',
  subscription_ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Documents saved by users
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('invoice','contract','privacy_policy','terms','business_names')),
  title text not null,
  data jsonb not null default '{}',
  html_content text,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  status text not null default 'pending' check (status in ('pending','active','unsubscribed')),
  source text default 'website',
  confirm_token text unique default uuid_generate_v4()::text,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz default now()
);

-- Newsletter issues (generated daily)
create table public.newsletters (
  id uuid default uuid_generate_v4() primary key,
  subject text not null,
  preview_text text,
  html_content text not null,
  status text not null default 'draft' check (status in ('draft','sent','failed')),
  recipients_count integer default 0,
  opens_count integer default 0,
  clicks_count integer default 0,
  sent_at timestamptz,
  created_at timestamptz default now()
);

-- Blog posts (AI generated, reviewed by admin)
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  seo_title text,
  seo_description text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Tool usage analytics (anonymous ok)
create table public.tool_usage (
  id uuid default uuid_generate_v4() primary key,
  tool text not null,
  user_id uuid references public.users(id) on delete set null,
  plan text default 'free',
  country text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.documents enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletters enable row level security;
alter table public.blog_posts enable row level security;
alter table public.tool_usage enable row level security;

-- Policies
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can view own documents" on public.documents for all using (auth.uid() = user_id);
create policy "Published blog posts are public" on public.blog_posts for select using (published = true);
create policy "Newsletters are public" on public.newsletters for select using (status = 'sent');
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);
create policy "Anyone can insert tool usage" on public.tool_usage for insert with check (true);

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for performance
create index idx_documents_user_id on public.documents(user_id);
create index idx_documents_type on public.documents(type);
create index idx_tool_usage_tool on public.tool_usage(tool);
create index idx_tool_usage_created on public.tool_usage(created_at desc);
create index idx_newsletters_status on public.newsletters(status);
create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_subscribers_status on public.newsletter_subscribers(status);
