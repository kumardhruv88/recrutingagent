"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

const filterCategories = [
  { id: "department", label: "Department", options: ["Engineering", "Product", "Design", "Sales", "Marketing"] },
  { id: "location", label: "Location", options: ["Remote", "New York", "San Francisco", "London"] },
  { id: "status", label: "Status", options: ["Active", "Closed", "On Hold"] }
];

export function AnalyticsFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Engineering", "Active"]);

  const toggleFilter = (option: string) => {
    setActiveFilters(prev => 
      prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]
    );
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-4 shrink-0">
        <Filter className="h-4 w-4" />
        Quick Filters
      </div>
      
      <div className="flex flex-wrap gap-2 flex-1">
        {filterCategories.map(category => (
          <div key={category.id} className="flex flex-wrap gap-2 items-center">
            {category.options.slice(0, 3).map(option => {
              const isActive = activeFilters.includes(option);
              return (
                <Badge
                  key={option}
                  variant={isActive ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors duration-200 text-xs py-1 px-3 ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-muted-foreground/20'}`}
                  onClick={() => toggleFilter(option)}
                >
                  {option}
                  {isActive && <X className="ml-1.5 h-3 w-3 inline-block opacity-70 hover:opacity-100" />}
                </Badge>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
