-- Seed data for Janus AI platform with proper UUIDs
-- Create sample organizations first
INSERT INTO public.organizations (id, name) VALUES
  (gen_random_uuid(), 'Janus Capital Partners'),
  (gen_random_uuid(), 'Brooklyn Investment Group');

-- Get the organization ID for seeding deals
DO $$
DECLARE
    demo_org_id UUID;
BEGIN
    -- Get the first organization ID
    SELECT id INTO demo_org_id FROM public.organizations WHERE name = 'Janus Capital Partners' LIMIT 1;
    
    -- Seed deals data - NYC & Puerto Rico focus
    INSERT INTO public.deals (
      organization_id, address, city, state, zip, lat, lon, 
      property_type, units, distress_signals, score, status
    ) VALUES
      -- Brooklyn Deals
      (demo_org_id, '1247 Atlantic Avenue', 'Brooklyn', 'NY', '11216', 
       40.6782, -73.9442, 'Multi-Family', 4, ARRAY['tax_delinquency', 'building_violations'], 87, 'NEW'),
      
      (demo_org_id, '156 MacDonough Street', 'Brooklyn', 'NY', '11233', 
       40.6829, -73.9441, 'Single Family', 1, ARRAY['below_market_rent', 'lien'], 82, 'REVIEWING'),
       
      -- Queens Deals
      (demo_org_id, '91-15 Corona Avenue', 'Queens', 'NY', '11368', 
       40.7498, -73.8648, 'Multi-Family', 3, ARRAY['tax_delinquency'], 79, 'NEW'),
       
      -- Bronx Deals
      (demo_org_id, '1455 Webster Avenue', 'Bronx', 'NY', '10456', 
       40.8303, -73.9097, 'Multi-Family', 2, ARRAY['building_violations', 'below_market_rent'], 75, 'NEW'),
       
      -- San Juan, PR Deals
      (demo_org_id, '1567 Calle San Sebastián', 'San Juan', 'PR', '00901', 
       18.4671, -66.1185, 'Single Family', 1, ARRAY['tax_delinquency', 'lien'], 89, 'NEW'),
       
      (demo_org_id, '234 Avenida Ashford', 'San Juan', 'PR', '00907', 
       18.4574, -66.0847, 'Multi-Family', 4, ARRAY['below_market_rent'], 84, 'REVIEWING'),
       
      -- Carolina, PR Deals
      (demo_org_id, '789 Calle Principal', 'Carolina', 'PR', '00983', 
       18.3809, -65.9574, 'Single Family', 1, ARRAY['building_violations'], 77, 'NEW'),
       
      -- Bayamón, PR Deals
      (demo_org_id, '456 Calle Degetau', 'Bayamón', 'PR', '00956', 
       18.3988, -66.1614, 'Multi-Family', 2, ARRAY['tax_delinquency', 'below_market_rent'], 81, 'NEW');
END $$;