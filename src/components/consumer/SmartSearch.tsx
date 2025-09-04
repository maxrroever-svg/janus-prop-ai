import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Heart, DollarSign, TrendingUp } from "lucide-react";

const mockProperties = [
  {
    id: 1,
    address: "123 Maple Street, Brooklyn, NY",
    price: "$650,000",
    monthlyPayment: "$3,200",
    valueVsComps: "+$25K vs comps",
    aiNote: "Great value in emerging neighborhood. Schools improving rapidly.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    address: "456 Oak Avenue, Queens, NY", 
    price: "$545,000",
    monthlyPayment: "$2,800",
    valueVsComps: "+$15K vs comps",
    aiNote: "Perfect starter home. Low maintenance, good commuter access.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    address: "789 Pine Road, Bronx, NY",
    price: "$425,000", 
    monthlyPayment: "$2,200",
    valueVsComps: "+$10K vs comps",
    aiNote: "Up-and-coming area. Property values rising 8% annually.",
    image: "/placeholder.svg"
  }
];

export const SmartSearch = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-semibold text-foreground">
          Smart Search + Deal Feed
        </h2>
        <div className="flex space-x-3">
          <Button className="btn-professional">
            <MapPin className="h-4 w-4 mr-2" />
            Show Me Homes Near Me
          </Button>
          <Button variant="outline" className="btn-institutional">
            <Search className="h-4 w-4 mr-2" />
            Find a Specific Location
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        AI-powered personalized feed of homes curated specifically for you
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <Card key={property.id} className="institutional-card hover:border-accent/50 cursor-pointer">
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <div className="text-muted-foreground">Property Image</div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">{property.address}</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">{property.price}</span>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Payment:</span>
                    <span className="font-medium text-foreground">{property.monthlyPayment}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Value vs Comps:</span>
                    <span className="font-medium text-success">{property.valueVsComps}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-foreground">{property.aiNote}</p>
                </div>
                
                <Button className="w-full btn-professional" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};