-- ==============================================================================
-- OUTSYRA: Complete Multi-Tenant Database Schema & Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'creator' CHECK (role IN ('creator', 'admin', 'customer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATOR WORKSPACES (Multi-Tenancy Root)
CREATE TABLE IF NOT EXISTS public.creator_workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    username TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    cover_url TEXT,
    category TEXT NOT NULL DEFAULT 'Digital Creator',
    instagram_handle TEXT,
    website_url TEXT,
    country TEXT DEFAULT 'US',
    currency TEXT DEFAULT 'USD',
    plan_tier TEXT NOT NULL DEFAULT 'free' CHECK (plan_tier IN ('free', 'creator', 'pro', 'business')),
    theme_config JSONB DEFAULT '{
        "primaryColor": "#6366f1",
        "backgroundColor": "#09090b",
        "cardStyle": "glass",
        "fontFamily": "Inter",
        "buttonShape": "rounded-xl",
        "layout": "classic"
    }'::jsonb,
    custom_domain TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STORE PAGES & BLOCKS (Link-in-Bio Storefront)
CREATE TABLE IF NOT EXISTS public.store_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('header', 'product', 'course', 'booking', 'coaching', 'link', 'newsletter', 'community', 'socials', 'custom_html')),
    title TEXT NOT NULL,
    subtitle TEXT,
    url TEXT,
    icon TEXT,
    item_id UUID,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DIGITAL PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    cover_image TEXT,
    category TEXT NOT NULL DEFAULT 'ebook' CHECK (category IN ('ebook', 'template', 'video', 'audio', 'zip', 'pdf', 'other')),
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    file_url TEXT,
    file_name TEXT,
    file_size BIGINT,
    total_sales INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, slug)
);

-- 5. COURSES & LMS
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    thumbnail_url TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    is_free BOOLEAN DEFAULT FALSE,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    total_students INTEGER DEFAULT 0,
    certificate_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, slug)
);

CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'video' CHECK (type IN ('video', 'text', 'pdf', 'audio', 'quiz')),
    content TEXT,
    video_url TEXT,
    file_url TEXT,
    duration_minutes INTEGER DEFAULT 10,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_free_preview BOOLEAN DEFAULT FALSE,
    quiz_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    progress_percentage NUMERIC(5, 2) DEFAULT 0.00,
    is_completed BOOLEAN DEFAULT FALSE,
    certificate_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, customer_email)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID NOT NULL REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    UNIQUE(enrollment_id, lesson_id)
);

-- 6. CALENDAR & BOOKINGS
CREATE TABLE IF NOT EXISTS public.booking_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    buffer_before_minutes INTEGER DEFAULT 5,
    buffer_after_minutes INTEGER DEFAULT 5,
    max_bookings_per_day INTEGER DEFAULT 8,
    location_type TEXT DEFAULT 'jitsi' CHECK (location_type IN ('google_meet', 'jitsi', 'phone', 'in_person')),
    is_active BOOLEAN DEFAULT TRUE,
    cancellation_policy TEXT,
    questions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, slug)
);

CREATE TABLE IF NOT EXISTS public.availability_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL DEFAULT '09:00',
    end_time TIME NOT NULL DEFAULT '17:00',
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(workspace_id, day_of_week)
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.booking_services(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
    meeting_url TEXT,
    google_event_id TEXT,
    notes TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 1:1 COACHING OFFERS
CREATE TABLE IF NOT EXISTS public.coaching_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    duration_minutes INTEGER DEFAULT 60,
    frequency TEXT DEFAULT 'one_time' CHECK (frequency IN ('one_time', 'weekly', 'monthly')),
    includes JSONB DEFAULT '["60-min deep dive session", "Action plan PDF", "7 days chat support"]'::jsonb,
    intake_questions JSONB DEFAULT '["What is your primary goal?", "What has stopped you from achieving it?"]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INSTAGRAM AUTOMATION
CREATE TABLE IF NOT EXISTS public.instagram_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    instagram_business_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    encrypted_access_token TEXT NOT NULL,
    token_expires_at TIMESTAMPTZ,
    status TEXT DEFAULT 'connected' CHECK (status IN ('connected', 'disconnected', 'error')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.instagram_automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    trigger_type TEXT NOT NULL CHECK (trigger_type IN ('comment_keyword', 'dm_keyword', 'story_mention', 'new_follower')),
    trigger_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
    post_id TEXT,
    response_type TEXT NOT NULL DEFAULT 'send_dm' CHECK (response_type IN ('send_dm', 'reply_comment')),
    response_message TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    executions_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.instagram_automation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    rule_id UUID REFERENCES public.instagram_automation_rules(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    sender_handle TEXT,
    message_content TEXT,
    response_sent TEXT,
    status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'rate_limited')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EMAIL & NEWSLETTER MARKETING
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    tags JSONB DEFAULT '["general"]'::jsonb,
    status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'bounced')),
    source TEXT DEFAULT 'link_in_bio',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, email)
);

CREATE TABLE IF NOT EXISTS public.email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    preview_text TEXT,
    content TEXT NOT NULL,
    target_tags JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent')),
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    total_recipients INTEGER DEFAULT 0,
    open_rate NUMERIC(5, 2) DEFAULT 0.00,
    click_rate NUMERIC(5, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SOCIAL MEDIA TEMPLATES
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('instagram_post', 'instagram_story', 'reels_cover', 'youtube_thumbnail', 'linkedin', 'twitter')),
    thumbnail_url TEXT NOT NULL,
    canvas_json JSONB NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.template_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, template_id)
);

-- 11. CREATOR COMMUNITY
CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    price_monthly NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES public.community_channels(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ORDERS & TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('product', 'course', 'booking', 'coaching', 'community_subscription')),
    item_id UUID NOT NULL,
    item_name TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    payment_provider TEXT NOT NULL CHECK (payment_provider IN ('stripe', 'razorpay', 'free')),
    payment_id TEXT,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. AUDIENCE ANALYTICS & EVENTS
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    visitor_id TEXT,
    source TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PROVIDER USAGES & OBSERVABILITY
CREATE TABLE IF NOT EXISTS public.provider_usages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL UNIQUE,
    monthly_limit INTEGER NOT NULL,
    current_usage INTEGER NOT NULL DEFAULT 0,
    daily_limit INTEGER,
    status TEXT NOT NULL DEFAULT 'operational',
    reset_date TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID REFERENCES public.creator_workspaces(id) ON DELETE CASCADE,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Helper function: Get current user workspace
CREATE OR REPLACE FUNCTION get_user_workspace_id(user_uuid UUID)
RETURNS UUID AS $$
    SELECT id FROM public.creator_workspaces WHERE user_id = user_uuid LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Public Store Access Policy (Anyone can view published storefronts, products, courses, booking types)
CREATE POLICY "Public can view active workspaces" ON public.creator_workspaces FOR SELECT USING (true);
CREATE POLICY "Public can view active store blocks" ON public.store_blocks FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view published products" ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published courses" ON public.courses FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published course modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Public can view published lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public can view active booking services" ON public.booking_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active coaching offers" ON public.coaching_offers FOR SELECT USING (is_active = true);

-- Tenant Isolation Policies for Creator Workspaces
CREATE POLICY "Creators can manage own workspace" ON public.creator_workspaces
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Creators can manage own store blocks" ON public.store_blocks
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can manage own products" ON public.products
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can manage own courses" ON public.courses
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can manage own bookings" ON public.bookings
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can manage own Instagram automation" ON public.instagram_automation_rules
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can manage own email campaigns" ON public.email_campaigns
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));

CREATE POLICY "Creators can view own orders" ON public.orders
    FOR ALL USING (workspace_id = get_user_workspace_id(auth.uid()));
