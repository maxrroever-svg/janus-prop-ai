-- Complete the seed data with remaining tables
DO $$
DECLARE
    deal_1_id UUID;
    deal_5_id UUID;
    demo_org_id UUID;
BEGIN
    -- Get the organization ID
    SELECT id INTO demo_org_id FROM public.organizations WHERE name = 'Janus Capital Partners' LIMIT 1;
    
    -- Get deal IDs for references
    SELECT id INTO deal_1_id FROM public.deals WHERE address = '1247 Atlantic Avenue' LIMIT 1;
    SELECT id INTO deal_5_id FROM public.deals WHERE address = '1567 Calle San Sebastián' LIMIT 1;
    
    -- Seed underwriting data for first two deals
    INSERT INTO public.underwriting (
      deal_id, arv, rehab, ltv, rate, noi, coc, irr, dscr
    ) VALUES
      (deal_1_id, 850000, 120000, 0.76, 6.75, 78000, 14.2, 18.5, 1.45),
      (deal_5_id, 285000, 45000, 0.65, 5.95, 32000, 18.7, 22.4, 1.52);

    -- Seed comparables data
    INSERT INTO public.comps (
      deal_id, address, distance_km, beds, baths, sqft, price, sold_at, cap_rate
    ) VALUES
      -- Comps for Brooklyn deal
      (deal_1_id, '1245 Atlantic Avenue', 0.1, 2, 1, 950, 485000, '2024-01-15', 6.8),
      (deal_1_id, '89 MacDonough Street', 0.2, 3, 2, 1200, 520000, '2024-02-03', 7.1),
      (deal_1_id, '67 Stuyvesant Avenue', 0.3, 2, 1, 900, 475000, '2024-01-28', 6.9),
      
      -- Comps for San Juan deal
      (deal_5_id, '1565 Calle San Sebastián', 0.1, 2, 1, 850, 195000, '2024-02-10', 8.2),
      (deal_5_id, '201 Calle de la Fortaleza', 0.2, 3, 2, 1100, 225000, '2024-01-20', 7.9),
      (deal_5_id, '456 Calle del Cristo', 0.15, 2, 1, 800, 185000, '2024-02-05', 8.5);

    -- Seed owner information
    INSERT INTO public.owner_info (
      deal_id, name, email, phone, mailing_address
    ) VALUES
      (deal_1_id, 'Maria Rodriguez', 'mrodriguez@email.com', '(718) 555-0123', '1247 Atlantic Avenue, Brooklyn, NY 11216'),
      (deal_5_id, 'Carlos Méndez', 'cmendez@email.com', '(787) 555-0198', '1567 Calle San Sebastián, San Juan, PR 00901');

    -- Seed agent runs data
    INSERT INTO public.agent_runs (
      deal_id, type, status, started_at, finished_at, log
    ) VALUES
      (deal_1_id, 'THEME_SCOUT', 'done', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1.5 hours', '{"findings": ["tax_delinquency", "building_violations"], "confidence": 0.92}'),
      (deal_1_id, 'UNDERWRITER', 'done', NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1 hour', '{"comps_found": 3, "arv_confidence": 0.88, "scenarios": ["base", "optimistic", "conservative"]}'),
      (deal_1_id, 'LEGAL', 'done', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', '{"title_issues": 0, "lien_count": 1, "zoning_compliant": true}'),
      (deal_1_id, 'CAPITAL', 'done', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', '{"dscr": 1.45, "qualifying_lenders": 5, "best_rate": 6.75}'),
      (deal_1_id, 'OUTREACH', 'done', NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '5 minutes', '{"owner_found": true, "contact_verified": true, "draft_ready": true}');

    -- Seed IC memos
    INSERT INTO public.ic_memos (
      deal_id, summary, risks, decision
    ) VALUES
      (deal_1_id, 'Strong value-add opportunity in gentrifying Brooklyn neighborhood. Property shows significant distress signals but fundamentals support 14%+ CoC returns with moderate rehab.', 'Tax delinquency requires immediate attention. Building violations need resolution before closing. Market timing risk due to interest rate environment.', 'APPROVE with conditions: resolve tax issues and obtain violation remediation plan before proceeding.'),
      (deal_5_id, 'Exceptional opportunity in Old San Juan historic district. Below-market acquisition with strong rental demand. High projected returns of 18.7% CoC driven by tourism recovery.', 'Historic district restrictions may limit renovation scope. Hurricane risk requires comprehensive insurance. Currency exchange considerations for mainland investors.', 'APPROVE - priority deal for PR portfolio expansion.');

    -- Seed audit logs
    INSERT INTO public.audit_logs (
      organization_id, actor_id, action, meta
    ) VALUES
      (demo_org_id, NULL, 'deal_created', '{"deal_id": "' || deal_1_id || '", "address": "1247 Atlantic Avenue"}'),
      (demo_org_id, NULL, 'agent_run_completed', '{"deal_id": "' || deal_1_id || '", "agent": "THEME_SCOUT", "duration_ms": 1800000}'),
      (demo_org_id, NULL, 'ic_memo_generated', '{"deal_id": "' || deal_1_id || '", "decision": "APPROVE"}');
END $$;