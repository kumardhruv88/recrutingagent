"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileJson, FileText, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ExportsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a download.
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Export Audit Logs</h2>
        <p className="text-muted-foreground mt-1">Download historical event data for compliance and offline analysis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Select parameters for your audit log export.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> CSV (Spreadsheet)
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" /> JSON (Machine Readable)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="30d">
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="custom" disabled>Custom Range (Enterprise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Included Modules</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select modules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="security">Security Only</SelectItem>
                  <SelectItem value="auth">Authentication Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6 border-t flex justify-end">
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? "Preparing Export..." : "Generate Export"}
              {!isExporting && <Download className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Previously generated audit log reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, date: "Jul 15, 2026", format: "CSV", size: "2.4 MB", range: "Last 30 Days" },
                  { id: 2, date: "Jun 01, 2026", format: "JSON", size: "8.1 MB", range: "All Time" },
                  { id: 3, date: "May 15, 2026", format: "CSV", size: "1.2 MB", range: "Last 7 Days" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                        {item.format === "CSV" ? <FileText className="h-5 w-5 text-primary" /> : <FileJson className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">Security_Audit_{item.date.replace(/ /g, '_')}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] h-4">{item.format}</Badge>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
