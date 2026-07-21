"use client";

import { useState } from "react";
import { mockIntegrations } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Hash, GitBranch, Video, CheckCircle2 } from "lucide-react";

interface IntegrationsTabProps {
  onChange: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case "Calendar": return <Calendar className="h-6 w-6" />;
    case "Hash": return <Hash className="h-6 w-6" />;
    case "Github": return <GitBranch className="h-6 w-6" />;
    case "Video": return <Video className="h-6 w-6" />;
    default: return <Calendar className="h-6 w-6" />;
  }
};

export function IntegrationsTab({ onChange }: IntegrationsTabProps) {
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const toggleStatus = (id: string) => {
    setIntegrations(integrations.map(int => {
      if (int.id === id) {
        return {
          ...int,
          status: int.status === "connected" ? "disconnected" : "connected",
        };
      }
      return int;
    }));
    onChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your favorite tools to streamline your workflow.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((int) => (
          <Card key={int.id} className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-muted rounded-xl">
                {getIcon(int.icon)}
              </div>
              {int.status === "connected" ? (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Disconnected
                </Badge>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{int.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {int.description}
              </p>
            </div>

            <div className="pt-4 border-t mt-auto flex items-center justify-between">
              {int.status === "connected" ? (
                <>
                  <span className="text-xs text-muted-foreground">
                    Last sync: {new Date(int.lastSync!).toLocaleDateString()}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleStatus(int.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 border-transparent"
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  onClick={() => toggleStatus(int.id)}
                >
                  Connect {int.name}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
