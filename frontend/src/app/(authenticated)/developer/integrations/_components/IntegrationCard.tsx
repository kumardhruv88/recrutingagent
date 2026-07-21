import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Integration } from "@/data/developer";
import { Hash, Calendar, Sparkles, List, Code2, Briefcase, Puzzle } from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
}

const iconMap: Record<string, React.ReactNode> = {
  Hash: <Hash className="h-6 w-6 text-pink-500" />,
  Calendar: <Calendar className="h-6 w-6 text-blue-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500" />,
  List: <List className="h-6 w-6 text-indigo-500" />,
  Github: <Code2 className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />,
  Briefcase: <Briefcase className="h-6 w-6 text-emerald-500" />,
  default: <Puzzle className="h-6 w-6 text-primary" />,
};

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const isConnected = integration.status === "connected";
  
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center border shadow-sm">
            {iconMap[integration.icon] || iconMap.default}
          </div>
          {isConnected && (
            <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">
              Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{integration.name}</h3>
        <p className="text-sm text-muted-foreground leading-snug">
          {integration.description}
        </p>
      </CardContent>
      <CardFooter className="pt-4 border-t bg-muted/20">
        <Button 
          variant={isConnected ? "outline" : "default"} 
          className="w-full"
        >
          {isConnected ? "Configure" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}
