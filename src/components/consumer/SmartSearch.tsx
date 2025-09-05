import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Heart, DollarSign, TrendingUp, Filter } from "lucide-react";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  
  return (
    <section className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
          Find Your Perfect Home
        </h2>
        <p className="text-lg text-muted-foreground">
          AI-powered search that understands what you're really looking for
        </p>
      </div>

      {/* Smart Search Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Describe your ideal home... (e.g., 'two bedroom house in Detroit near good schools with a terrace')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base py-6"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Choose an area or let AI search everywhere" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                  <SelectItem value="queens">Queens, NY</SelectItem>
                  <SelectItem value="detroit">Detroit, MI</SelectItem>
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                  <SelectItem value="miami">Miami, FL</SelectItem>
                  <SelectItem value="anywhere">Search Everywhere</SelectItem>
                </SelectContent>
              </Select>
              
              <Button size="lg" className="btn-professional px-8">
                <Search className="w-4 h-4 mr-2" />
                AI Search
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Show Me Homes Near Me
              </Button>
              <Button size="lg" variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
          Personalized Home Feed
        </h3>
        <p className="text-muted-foreground mb-6">
          AI-curated properties based on your preferences and behavior
        </p>
      </div>

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