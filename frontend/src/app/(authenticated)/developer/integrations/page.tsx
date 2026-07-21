"use client";

import { useState } from "react";
import { mockIntegrations } from "@/data/developer";
import { IntegrationCard } from "./_components/IntegrationCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Communication", "Productivity", "AI", "ATS", "Authentication", "Storage"];

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || integration.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Integrations Marketplace</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Connect HireMind AI with your existing tools and workflows.
          </p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-9 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="w-max">
          <TabsList className="bg-muted/50 border">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="rounded-md">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredIntegrations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIntegrations.map(integration => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border rounded-lg bg-card/50 border-dashed">
          <h3 className="text-lg font-semibold">No integrations found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm mx-auto text-sm">
            We couldn&apos;t find any integrations matching your search criteria. Try a different term or category.
          </p>
        </div>
      )}
    </div>
  );
}
