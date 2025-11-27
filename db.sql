-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.advertisements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  partner_id text,
  title text NOT NULL,
  description text,
  image_url text,
  contact text,
  valid_until timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT advertisements_pkey PRIMARY KEY (id)
);
CREATE TABLE public.announcements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  is_urgent boolean DEFAULT false,
  valid_from timestamp with time zone DEFAULT now(),
  valid_until timestamp with time zone,
  created_by text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT announcements_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  description text,
  location text NOT NULL,
  event_date timestamp with time zone NOT NULL,
  tags ARRAY DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.facilities (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  location text,
  manager_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT facilities_pkey PRIMARY KEY (id),
  CONSTRAINT facilities_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES auth.users(id)
);
CREATE TABLE public.guards (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  shift_info text,
  location_assigned text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT guards_pkey PRIMARY KEY (id),
  CONSTRAINT guards_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.offers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  description text,
  location text,
  contact text,
  valid_until timestamp with time zone NOT NULL,
  tags ARRAY DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT offers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  full_name text,
  avatar_url text,
  phone text,
  role text DEFAULT 'user'::text CHECK (role = ANY (ARRAY['super_admin'::text, 'facility_manager'::text, 'event_organizer'::text, 'partner'::text, 'user'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid,
  phone text,
  location text NOT NULL,
  description text,
  image_url text,
  tags ARRAY DEFAULT '{}'::text[],
  delivery_available boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT properties_pkey PRIMARY KEY (id),
  CONSTRAINT properties_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.property_categories(id)
);
CREATE TABLE public.property_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  CONSTRAINT property_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.residents (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  unit text,
  profile_image_url text,
  created_at timestamp with time zone DEFAULT now(),
  property_id uuid,
  CONSTRAINT residents_pkey PRIMARY KEY (id),
  CONSTRAINT residents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT residents_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id)
);
CREATE TABLE public.security_check_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  visitor_id uuid,
  guard_id uuid,
  check_time timestamp with time zone DEFAULT now(),
  action text,
  details text,
  CONSTRAINT security_check_logs_pkey PRIMARY KEY (id),
  CONSTRAINT security_check_logs_visitor_id_fkey FOREIGN KEY (visitor_id) REFERENCES public.visitors(id),
  CONSTRAINT security_check_logs_guard_id_fkey FOREIGN KEY (guard_id) REFERENCES public.guards(id)
);
CREATE TABLE public.visit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  visitor_id uuid,
  resident_id uuid,
  property_id uuid,
  action text NOT NULL,
  details text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT visit_logs_pkey PRIMARY KEY (id),
  CONSTRAINT visit_logs_visitor_id_fkey FOREIGN KEY (visitor_id) REFERENCES public.visitors(id),
  CONSTRAINT visit_logs_resident_id_fkey FOREIGN KEY (resident_id) REFERENCES public.residents(id),
  CONSTRAINT visit_logs_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id)
);
CREATE TABLE public.visitors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  resident_id uuid,
  name text NOT NULL,
  phone text,
  purpose text,
  area text,
  expected_arrival timestamp with time zone,
  qr_data text,
  issued_at timestamp with time zone DEFAULT now(),
  is_checked_in boolean DEFAULT false,
  check_in_time timestamp with time zone,
  check_out_time timestamp with time zone,
  status text DEFAULT 'issued'::text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT visitors_pkey PRIMARY KEY (id),
  CONSTRAINT visitors_resident_id_fkey FOREIGN KEY (resident_id) REFERENCES public.residents(id)
);
CREATE TABLE public.vouchers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code text NOT NULL UNIQUE,
  resident_id uuid,
  facility_id uuid,
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'redeemed'::text, 'expired'::text])),
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vouchers_pkey PRIMARY KEY (id),
  CONSTRAINT vouchers_resident_id_fkey FOREIGN KEY (resident_id) REFERENCES auth.users(id),
  CONSTRAINT vouchers_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id)
);