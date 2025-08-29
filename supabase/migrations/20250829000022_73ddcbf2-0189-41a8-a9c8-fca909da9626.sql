-- Seed data for Janus AI platform
-- Create sample organizations first
INSERT INTO public.organizations (id, name) VALUES
  ('org-demo-1', 'Janus Capital Partners'),
  ('org-demo-2', 'Brooklyn Investment Group');

-- Seed deals data - NYC & Puerto Rico focus
INSERT INTO public.deals (
  id, organization_id, address, city, state, zip, lat, lon, 
  property_type, units, distress_signals, score, status
) VALUES
  -- Brooklyn Deals
  ('deal-1', 'org-demo-1', '1247 Atlantic Avenue', 'Brooklyn', 'NY', '11216', 
   40.6782, -73.9442, 'Multi-Family', 4, ARRAY['tax_delinquency', 'building_violations'], 87, 'NEW'),
  
  ('deal-2', 'org-demo-1', '156 MacDonough Street', 'Brooklyn', 'NY', '11233', 
   40.6829, -73.9441, 'Single Family', 1, ARRAY['below_market_rent', 'lien'], 82, 'REVIEWING'),
   
  -- Queens Deals
  ('deal-3', 'org-demo-1', '91-15 Corona Avenue', 'Queens', 'NY', '11368', 
   40.7498, -73.8648, 'Multi-Family', 3, ARRAY['tax_delinquency'], 79, 'NEW'),
   
  -- Bronx Deals
  ('deal-4', 'org-demo-1', '1455 Webster Avenue', 'Bronx', 'NY', '10456', 
   40.8303, -73.9097, 'Multi-Family', 2, ARRAY['building_violations', 'below_market_rent'], 75, 'NEW'),
   
  -- San Juan, PR Deals
  ('deal-5', 'org-demo-1', '1567 Calle San Sebastián', 'San Juan', 'PR', '00901', 
   18.4671, -66.1185, 'Single Family', 1, ARRAY['tax_delinquency', 'lien'], 89, 'NEW'),
   
  ('deal-6', 'org-demo-1', '234 Avenida Ashford', 'San Juan', 'PR', '00907', 
   18.4574, -66.0847, 'Multi-Family', 4, ARRAY['below_market_rent'], 84, 'REVIEWING'),
   
  -- Carolina, PR Deals
  ('deal-7', 'org-demo-1', '789 Calle Principal', 'Carolina', 'PR', '00983', 
   18.3809, -65.9574, 'Single Family', 1, ARRAY['building_violations'], 77, 'NEW'),
   
  -- Bayamón, PR Deals
  ('deal-8', 'org-demo-1', '456 Calle Degetau', 'Bayamón', 'PR', '00956', 
   18.3988, -66.1614, 'Multi-Family', 2, ARRAY['tax_delinquency', 'below_market_rent'], 81, 'NEW');

-- Seed underwriting data
INSERT INTO public.underwriting (
  deal_id, arv, rehab, ltv, rate, noi, coc, irr, dscr
) VALUES
  ('deal-1', 850000, 120000, 0.76, 6.75, 78000, 14.2, 18.5, 1.45),
  ('deal-2', 580000, 85000, 0.72, 6.50, 52000, 12.8, 16.2, 1.32),
  ('deal-3', 720000, 95000, 0.81, 6.85, 68000, 13.5, 17.1, 1.38),
  ('deal-4', 520000, 75000, 0.74, 6.60, 48000, 15.1, 19.3, 1.28),
  ('deal-5', 285000, 45000, 0.65, 5.95, 32000, 18.7, 22.4, 1.52),
  ('deal-6', 425000, 60000, 0.75, 6.25, 54000, 16.9, 20.1, 1.41),
  ('deal-7', 235000, 35000, 0.70, 6.15, 28000, 17.2, 21.8, 1.48),
  ('deal-8', 275000, 40000, 0.71, 6.35, 36000, 19.4, 23.2, 1.55);

-- Seed comparables data
INSERT INTO public.comps (
  deal_id, address, distance_km, beds, baths, sqft, price, sold_at, cap_rate
) VALUES
  -- Comps for deal-1 (Brooklyn)
  ('deal-1', '1245 Atlantic Avenue', 0.1, 2, 1, 950, 485000, '2024-01-15', 6.8),
  ('deal-1', '89 MacDonough Street', 0.2, 3, 2, 1200, 520000, '2024-02-03', 7.1),
  ('deal-1', '67 Stuyvesant Avenue', 0.3, 2, 1, 900, 475000, '2024-01-28', 6.9),
  
  -- Comps for deal-5 (San Juan)
  ('deal-5', '1565 Calle San Sebastián', 0.1, 2, 1, 850, 195000, '2024-02-10', 8.2),
  ('deal-5', '201 Calle de la Fortaleza', 0.2, 3, 2, 1100, 225000, '2024-01-20', 7.9),
  ('deal-5', '456 Calle del Cristo', 0.15, 2, 1, 800, 185000, '2024-02-05', 8.5);

-- Seed owner information
INSERT INTO public.owner_info (
  deal_id, name, email, phone, mailing_address
) VALUES
  ('deal-1', 'Maria Rodriguez', 'mrodriguez@email.com', '(718) 555-0123', '1247 Atlantic Avenue, Brooklyn, NY 11216'),
  ('deal-5', 'Carlos Méndez', 'cmendez@email.com', '(787) 555-0198', '1567 Calle San Sebastián, San Juan, PR 00901');

-- Seed agent runs data
INSERT INTO public.agent_runs (
  deal_id, type, status, started_at, finished_at, log
) VALUES
  ('deal-1', 'THEME_SCOUT', 'done', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1.5 hours', '{"findings": ["tax_delinquency", "building_violations"], "confidence": 0.92}'),
  ('deal-1', 'UNDERWRITER', 'done', NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1 hour', '{"comps_found": 3, "arv_confidence": 0.88, "scenarios": ["base", "optimistic", "conservative"]}'),
  ('deal-1', 'LEGAL', 'done', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', '{"title_issues": 0, "lien_count": 1, "zoning_compliant": true}'),
  ('deal-1', 'CAPITAL', 'done', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', '{"dscr": 1.45, "qualifying_lenders": 5, "best_rate": 6.75}'),
  ('deal-1', 'OUTREACH', 'done', NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '5 minutes', '{"owner_found": true, "contact_verified": true, "draft_ready": true}');

-- Seed IC memos
INSERT INTO public.ic_memos (
  deal_id, summary, risks, decision
) VALUES
  ('deal-1', 'Strong value-add opportunity in gentrifying Brooklyn neighborhood. Property shows significant distress signals but fundamentals support 14%+ CoC returns with moderate rehab.', 'Tax delinquency requires immediate attention. Building violations need resolution before closing. Market timing risk due to interest rate environment.', 'APPROVE with conditions: resolve tax issues and obtain violation remediation plan before proceeding.'),
  ('deal-5', 'Exceptional opportunity in Old San Juan historic district. Below-market acquisition with strong rental demand. High projected returns of 18.7% CoC driven by tourism recovery.', 'Historic district restrictions may limit renovation scope. Hurricane risk requires comprehensive insurance. Currency exchange considerations for mainland investors.', 'APPROVE - priority deal for PR portfolio expansion.');

-- Seed audit logs
INSERT INTO public.audit_logs (
  organization_id, actor_id, action, meta
) VALUES
  ('org-demo-1', NULL, 'deal_created', '{"deal_id": "deal-1", "address": "1247 Atlantic Avenue"}'),
  ('org-demo-1', NULL, 'agent_run_completed', '{"deal_id": "deal-1", "agent": "THEME_SCOUT", "duration_ms": 1800000}'),
  ('org-demo-1', NULL, 'ic_memo_generated', '{"deal_id": "deal-1", "decision": "APPROVE"}');