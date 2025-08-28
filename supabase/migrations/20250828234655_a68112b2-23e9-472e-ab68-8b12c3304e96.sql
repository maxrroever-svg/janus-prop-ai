-- Fix security warnings by setting search_path for functions

-- Update has_role function with proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update get_user_organization function with proper search_path
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM public.profiles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
LANGUAGE PLPGSQL 
SECURITY DEFINER 
SET search_path = public
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

-- Update update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE PLPGSQL
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;