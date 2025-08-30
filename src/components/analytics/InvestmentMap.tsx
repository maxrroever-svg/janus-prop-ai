import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";

// Mock investment data
const investments = [
  { id: 1, address: "1247 Atlantic Avenue", lat: 40.6892, lng: -73.9442, value: 650000, roi: 14.2, status: "active" },
  { id: 2, address: "156 MacDonough Street", lat: 40.6879, lng: -73.9321, value: 420000, roi: 12.8, status: "active" },
  { id: 3, address: "91-15 Corona Avenue", lat: 40.7489, lng: -73.8648, value: 580000, roi: 13.5, status: "pending" },
  { id: 4, address: "1455 Webster Avenue", lat: 40.8376, lng: -73.9129, value: 320000, roi: 11.2, status: "completed" },
  { id: 5, address: "1567 Calle San Sebastián", lat: 18.4655, lng: -66.1057, value: 180000, roi: 45.5, status: "completed" }
];

export function InvestmentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = async (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      setIsLoading(true);
      
      // Dynamically import mapbox
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = token;
      
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-73.9442, 40.6892], // Brooklyn center
        zoom: 10,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.default.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        // Add investment markers
        investments.forEach((investment) => {
          const statusColors = {
            active: '#22c55e',
            pending: '#f59e0b', 
            completed: '#3b82f6'
          };

          const marker = new mapboxgl.default.Marker({
            color: statusColors[investment.status as keyof typeof statusColors]
          })
            .setLngLat([investment.lng, investment.lat])
            .setPopup(
              new mapboxgl.default.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h4 class="font-medium">${investment.address}</h4>
                    <p class="text-sm text-gray-600">Value: $${investment.value.toLocaleString()}</p>
                    <p class="text-sm text-gray-600">ROI: ${investment.roi}%</p>
                    <p class="text-sm text-gray-600">Status: ${investment.status}</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });
      });

      setShowTokenInput(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  return (
    <Card className="institutional-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Investment Locations
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-[500px] relative">
        {showTokenInput ? (
          <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="max-w-md mx-auto p-6 space-y-4">
              <div className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-medium">Mapbox Token Required</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your Mapbox public token to display investment locations. Get your token at{' '}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mapbox.com
                </a>
              </p>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="bg-background"
                />
                <Button 
                  onClick={handleTokenSubmit} 
                  disabled={!mapboxToken.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Loading Map...' : 'Initialize Map'}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
        
        {!showTokenInput && (
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Active ({investments.filter(i => i.status === 'active').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span>Pending ({investments.filter(i => i.status === 'pending').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Completed ({investments.filter(i => i.status === 'completed').length})</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}