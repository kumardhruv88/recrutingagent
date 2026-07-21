import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, Globe, Shield, Gauge } from "lucide-react";
import Link from "next/link";

export default function DeveloperSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Developer Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure security, limits, and download SDKs for your applications.
        </p>
      </div>

      <div className="space-y-6">
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              Security & CORS
            </CardTitle>
            <CardDescription>Configure which domains can make API requests using your keys.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Allowed Origins</Label>
              <Input placeholder="https://yourdomain.com, https://app.yourdomain.com" defaultValue="https://app.acme.com" />
              <p className="text-xs text-muted-foreground mt-1">
                Comma separated list of domains. Leave blank to allow any origin (not recommended for production).
              </p>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-lg mt-4">
              <div className="space-y-0.5">
                <Label className="text-base">Require signed requests</Label>
                <p className="text-sm text-muted-foreground">
                  Reject API requests that do not include a valid HMAC signature.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6 border-t flex justify-end">
            <Button>Save Security Settings</Button>
          </CardFooter>
        </Card>

        {/* Rate Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-muted-foreground" />
              Rate Limits
            </CardTitle>
            <CardDescription>Your current API rate limits based on your subscription tier.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">REST API Requests</span>
                <span className="text-muted-foreground">1,000 / minute</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[15%]" />
              </div>
              <p className="text-xs text-muted-foreground text-right">15% utilized in last hour</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Webhook Deliveries</span>
                <span className="text-muted-foreground">5,000 / minute</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[5%]" />
              </div>
              <p className="text-xs text-muted-foreground text-right">5% utilized in last hour</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6 border-t">
            <Link href="/billing/plans" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
              Upgrade Plan for Higher Limits
            </Link>
          </CardFooter>
        </Card>

        {/* Resources */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-muted-foreground" />
                Official SDKs
              </CardTitle>
              <CardDescription>Download official libraries to integrate faster.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Node.js / TypeScript</span>
                <Badge variant="secondary">v2.4.1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Python</span>
                <Badge variant="secondary">v1.8.0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Go</span>
                <Badge variant="secondary">v1.2.5</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <Link href="#" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                View GitHub Repositories
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                Documentation
              </CardTitle>
              <CardDescription>Everything you need to build with HireMind AI.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <Link href="#" className="flex items-center text-sm hover:underline text-primary gap-2">
                API Reference <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="#" className="flex items-center text-sm hover:underline text-primary gap-2">
                Authentication Guide <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="#" className="flex items-center text-sm hover:underline text-primary gap-2">
                Webhook Event Catalog <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="#" className="flex items-center text-sm hover:underline text-primary gap-2">
                Sandbox Testing <ExternalLink className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
