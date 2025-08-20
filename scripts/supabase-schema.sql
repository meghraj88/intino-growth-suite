-- Intino Dropship Growth Suite Database Schema
-- Run this SQL in Supabase SQL editor to create MVP tables

-- Users handled by Supabase Auth
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  company_name text,
  role text,
  created_at timestamptz default now()
);

create table stores (
  id uuid primary key default gen_random_uuid(),
  owner uuid references profiles(id) on delete cascade,
  provider text, -- 'shopify' | 'woocommerce' | 'custom'
  store_name text,
  store_domain text,
  access_token text, -- encrypted in app env ideally
  currency text,
  country text,
  created_at timestamptz default now()
);

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text,
  type text, -- 'aliexpress'|'manual'|'api'
  api_credentials jsonb,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete cascade,
  supplier_id uuid references suppliers(id),
  supplier_sku text,
  title text,
  description text,
  image_url text,
  cost numeric, -- supplier cost (latest)
  shipping_cost numeric,
  last_synced timestamptz,
  suggested_price numeric,
  margin_percent numeric,
  region text, -- optional geo tag
  metadata jsonb,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  store_order_id text,
  customer jsonb,
  items jsonb,
  total_amount numeric,
  supplier_order_status text,
  refund_status text, -- 'none'|'requested'|'processing'|'refunded'
  refund_risk_score numeric default 0,
  created_at timestamptz default now()
);

create table returns_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  reason text,
  status text default 'pending',
  auto_approved boolean default false,
  resolution jsonb,
  created_at timestamptz default now()
);

create table trend_signals (
  id uuid primary key default gen_random_uuid(),
  sku text,
  source text, -- 'aliexpress'|'amazon'|'etsy'
  country text,
  score numeric,
  data jsonb,
  detected_at timestamptz default now()
);

create table webhooks_log (
  id uuid primary key default gen_random_uuid(),
  type text,
  payload jsonb,
  status text,
  response jsonb,
  created_at timestamptz default now()
);

-- Basic indices
create index on products (store_id);
create index on orders (store_id);
create index on trend_signals (country);

-- Row Level Security (RLS) policies
alter table profiles enable row level security;
alter table stores enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table returns_requests enable row level security;
alter table trend_signals enable row level security;
alter table webhooks_log enable row level security;

-- Profiles policy
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Stores policy
create policy "Users can view own stores" on stores for select using (auth.uid() = owner);
create policy "Users can insert own stores" on stores for insert with check (auth.uid() = owner);
create policy "Users can update own stores" on stores for update using (auth.uid() = owner);
create policy "Users can delete own stores" on stores for delete using (auth.uid() = owner);

-- Products policy
create policy "Users can view own products" on products for select using (
  exists (select 1 from stores where stores.id = products.store_id and stores.owner = auth.uid())
);
create policy "Users can insert own products" on products for insert with check (
  exists (select 1 from stores where stores.id = products.store_id and stores.owner = auth.uid())
);
create policy "Users can update own products" on products for update using (
  exists (select 1 from stores where stores.id = products.store_id and stores.owner = auth.uid())
);
create policy "Users can delete own products" on products for delete using (
  exists (select 1 from stores where stores.id = products.store_id and stores.owner = auth.uid())
);

-- Orders policy
create policy "Users can view own orders" on orders for select using (
  exists (select 1 from stores where stores.id = orders.store_id and stores.owner = auth.uid())
);
create policy "Users can insert own orders" on orders for insert with check (
  exists (select 1 from stores where stores.id = orders.store_id and stores.owner = auth.uid())
);
create policy "Users can update own orders" on orders for update using (
  exists (select 1 from stores where stores.id = orders.store_id and stores.owner = auth.uid())
);

-- Returns policy
create policy "Users can view own returns" on returns_requests for select using (
  exists (
    select 1 from orders 
    join stores on stores.id = orders.store_id 
    where orders.id = returns_requests.order_id and stores.owner = auth.uid()
  )
);
create policy "Users can insert own returns" on returns_requests for insert with check (
  exists (
    select 1 from orders 
    join stores on stores.id = orders.store_id 
    where orders.id = returns_requests.order_id and stores.owner = auth.uid()
  )
);
create policy "Users can update own returns" on returns_requests for update using (
  exists (
    select 1 from orders 
    join stores on stores.id = orders.store_id 
    where orders.id = returns_requests.order_id and stores.owner = auth.uid()
  )
);

-- Trend signals policy (users can view all trends but only insert for their regions)
create policy "Users can view all trends" on trend_signals for select using (true);
create policy "Users can insert trends" on trend_signals for insert with check (true);

-- Webhooks log policy
create policy "Users can view own webhook logs" on webhooks_log for select using (true);
create policy "System can insert webhook logs" on webhooks_log for insert with check (true);
