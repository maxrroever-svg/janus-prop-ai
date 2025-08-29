-- Add remaining seed data for underwriting, comps, owners, and agent runs
DO $$
DECLARE
    deal_ids UUID[];
    deal_id UUID;
BEGIN
    -- Get all deal IDs
    SELECT ARRAY(SELECT id FROM public.deals ORDER BY address) INTO deal_ids;
    
    -- Seed underwriting data for first few deals
    IF array_length(deal_ids, 1) >= 8 THEN
        INSERT INTO public.underwriting (
          deal_id, arv, rehab, ltv, rate, noi, coc, irr, dscr
        ) VALUES
          (deal_ids[1], 850000, 120000, 0.76, 6.75, 78000, 14.2, 18.5, 1.45),
          (deal_ids[2], 580000, 85000, 0.72, 6.50, 52000, 12.8, 16.2, 1.32),
          (deal_ids[3], 720000, 95000, 0.81, 6.85, 68000, 13.5, 17.1, 1.38),
          (deal_ids[4], 520000, 75000, 0.74, 6.60, 48000, 15.1, 19.3, 1.28),
          (deal_ids[5], 285000, 45000, 0.65, 5.95, 32000, 18.7, 22.4, 1.52),
          (deal_ids[6], 425000, 60000, 0.75, 6.25, 54000, 16.9, 20.1, 1.41),
          (deal_ids[7], 235000, 35000, 0.70, 6.15, 28000, 17.2, 21.8, 1.48),
          (deal_ids[8], 275000, 40000, 0.71, 6.35, 36000, 19.4, 23.2, 1.55);
        
        -- Seed comparables data for first and fifth deals
        INSERT INTO public.comps (
          deal_id, address, distance_km, beds, baths, sqft, price, sold_at, cap_rate
        ) VALUES
          -- Comps for first deal (Brooklyn)
          (deal_ids[1], '1245 Atlantic Avenue', 0.1, 2, 1, 950, 485000, '2024-01-15', 6.8),
          (deal_ids[1], '89 MacDonough Street', 0.2, 3, 2, 1200, 520000, '2024-02-03', 7.1),
          (deal_ids[1], '67 Stuyvesant Avenue', 0.3, 2, 1, 900, 475000, '2024-01-28', 6.9),
          
          -- Comps for fifth deal (San Juan)
          (deal_ids[5], '1565 Calle San Sebastián', 0.1, 2, 1, 850, 195000, '2024-02-10', 8.2),
          (deal_ids[5], '201 Calle de la Fortaleza', 0.2, 3, 2, 1100, 225000, '2024-01-20', 7.9),
          (deal_ids[5], '456 Calle del Cristo', 0.15, 2, 1, 800, 185000, '2024-02-05', 8.5);
        
        -- Seed owner information for first and fifth deals
        INSERT INTO public.owner_info (
          deal_id, name, email, phone, mailing_address
        ) VALUES
          (deal_ids[1], 'Maria Rodriguez', 'mrodriguez@email.com', '(718) 555-0123', 
           (SELECT address || ', ' || city || ', ' || state || ' ' || zip FROM public.deals WHERE id = deal_ids[1])),
          (deal_ids[5], 'Carlos Méndez', 'cmendez@email.com', '(787) 555-0198', 
           (SELECT address || ', ' || city || ', ' || state || ' ' || zip FROM public.deals WHERE id = deal_ids[5]));
        
        -- Seed agent runs data for first deal
        INSERT INTO public.agent_runs (
          deal_id, type, status, started_at, finished_at, log
        ) VALUES
          (deal_ids[1], 'THEME_SCOUT', 'done', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1.5 hours', 
           '{"findings": ["tax_delinquency", "building_violations"], "confidence": 0.92}'),
          (deal_ids[1], 'UNDERWRITER', 'done', NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1 hour', 
           '{"comps_found": 3, "arv_confidence": 0.88, "scenarios": ["base", "optimistic", "conservative"]}'),
          (deal_ids[1], 'LEGAL', 'done', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', 
           '{"title_issues": 0, "lien_count": 1, "zoning_compliant": true}'),
          (deal_ids[1], 'CAPITAL', 'done', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', 
           '{"dscr": 1.45, "qualifying_lenders": 5, "best_rate": 6.75}'),
          (deal_ids[1], 'OUTREACH', 'done', NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '5 minutes', 
           '{"owner_found": true, "contact_verified": true, "draft_ready": true}');
    END IF;
END $$;