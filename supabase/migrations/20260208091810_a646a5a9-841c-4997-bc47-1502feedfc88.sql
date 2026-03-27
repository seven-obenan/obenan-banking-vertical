
-- ============================================
-- PART 1: Role System
-- ============================================

-- Enum for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Table to assign roles to users
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admins can view all roles
CREATE POLICY "Admins can view user_roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- PART 2: Email Submissions
-- ============================================

CREATE TABLE public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view email_submissions"
  ON public.email_submissions
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert email_submissions"
  ON public.email_submissions
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- PART 3: User Engagement
-- ============================================

CREATE TABLE public.user_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_id UUID,
  email TEXT NOT NULL
);

ALTER TABLE public.user_engagement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view user_engagement"
  ON public.user_engagement
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert user_engagement"
  ON public.user_engagement
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update user_engagement"
  ON public.user_engagement
  FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- PART 4: Slide Views
-- ============================================

CREATE TABLE public.slide_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  email TEXT NOT NULL,
  slide_id TEXT NOT NULL,
  view_start TIMESTAMPTZ DEFAULT now(),
  view_end TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.slide_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view slide_views"
  ON public.slide_views
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert slide_views"
  ON public.slide_views
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update slide_views"
  ON public.slide_views
  FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- PART 5: Brand Assets Storage Bucket
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true);

CREATE POLICY "Public read access for brand-assets"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'brand-assets');

CREATE POLICY "Authenticated users can upload brand-assets"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'brand-assets' AND auth.uid() IS NOT NULL);
