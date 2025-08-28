-- Create custom types
CREATE TYPE public.app_role AS ENUM ('OWNER', 'ADMIN', 'ANALYST', 'VIEWER');
CREATE TYPE public.agent_type AS ENUM ('THEME_SCOUT', 'UNDERWRITER', 'LEGAL', 'CAPITAL', 'OUTREACH');
CREATE TYPE public.deal_status AS ENUM ('NEW', 'REVIEWING', 'APPROVED', 'REJECTED', 'OUTREACH', 'IN_PROGRESS', 'CLOSED');

-- Organizations table
CREATE TABLE public.organizations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User profiles (additional user data beyond auth.users)
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    name TEXT,
    organization_id UUID REFERENCES public.organizations(id),
    role public.app_role DEFAULT 'ANALYST',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Deals table
CREATE TABLE public.deals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES public.organizations(id),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    lat DECIMAL,
    lon DECIMAL,
    property_type TEXT NOT NULL,
    units INTEGER,
    distress_signals TEXT[] DEFAULT '{}',
    score INTEGER DEFAULT 0,
    status public.deal_status DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Comparables table
CREATE TABLE public.comps (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    distance_km DECIMAL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    price INTEGER,
    sold_at TIMESTAMP WITH TIME ZONE,
    cap_rate DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Underwriting table
CREATE TABLE public.underwriting (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID NOT NULL UNIQUE REFERENCES public.deals(id) ON DELETE CASCADE,
    arv INTEGER,
    rehab INTEGER,
    ltv DECIMAL,
    rate DECIMAL,
    noi INTEGER,
    coc DECIMAL,
    irr DECIMAL,
    dscr DECIMAL,
    scenarios JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Owner information table
CREATE TABLE public.owner_info (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID NOT NULL UNIQUE REFERENCES public.deals(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    mailing_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Agent runs table
CREATE TABLE public.agent_runs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
    type public.agent_type NOT NULL,
    status TEXT NOT NULL DEFAULT 'idle',
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    log JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- IC Memos table
CREATE TABLE public.ic_memos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    risks TEXT NOT NULL,
    decision TEXT NOT NULL,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit log table
CREATE TABLE public.audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES public.organizations(id),
    actor_id UUID,
    action TEXT NOT NULL,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.underwriting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.owner_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ic_memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user's organization
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT organization_id
  FROM public.profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON public.organizations
FOR SELECT USING (id = public.get_user_organization(auth.uid()));

-- RLS Policies for deals
CREATE POLICY "Users can view organization deals" ON public.deals
FOR SELECT USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create deals in their organization" ON public.deals
FOR INSERT WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update organization deals" ON public.deals
FOR UPDATE USING (organization_id = public.get_user_organization(auth.uid()));

-- RLS Policies for related tables (comps, underwriting, etc.)
CREATE POLICY "Users can view comps for their organization's deals" ON public.comps
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.deals 
    WHERE id = deal_id 
    AND organization_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can view underwriting for their organization's deals" ON public.underwriting
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.deals 
    WHERE id = deal_id 
    AND organization_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can view owner info for their organization's deals" ON public.owner_info
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.deals 
    WHERE id = deal_id 
    AND organization_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can view agent runs for their organization's deals" ON public.agent_runs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.deals 
    WHERE id = deal_id 
    AND organization_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can view IC memos for their organization's deals" ON public.ic_memos
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.deals 
    WHERE id = deal_id 
    AND organization_id = public.get_user_organization(auth.uid())
  )
);

CREATE POLICY "Users can view audit logs for their organization" ON public.audit_logs
FOR SELECT USING (organization_id = public.get_user_organization(auth.uid()));

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
LANGUAGE PLPGSQL 
SECURITY DEFINER 
AS $$
DECLARE
  org_id UUID;
BEGIN
  -- Create a default organization for the user if they don't have one
  INSERT INTO public.organizations (name) 
  VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email) || '''s Organization')
  RETURNING id INTO org_id;
  
  -- Create profile for the new user
  INSERT INTO public.profiles (user_id, name, organization_id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    org_id,
    'OWNER'
  );
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_underwriting_updated_at BEFORE UPDATE ON public.underwriting FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();