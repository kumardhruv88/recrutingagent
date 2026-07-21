"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { APIKey } from "@/data/developer";
import { format } from "date-fns";
import { MoreHorizontal, KeyRound, EyeOff, RotateCw, Trash2, PowerOff } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface APIKeyTableProps {
  keys: APIKey[];
}

export function APIKeyTable({ keys }: APIKeyTableProps) {
  if (keys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg bg-card border-dashed">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <KeyRound className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No API keys</h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-sm">
          You haven&apos;t created any API keys yet. Generate one to start making programmatic requests.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Token (Masked)</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${apiKey.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                  <span className="font-medium text-sm">{apiKey.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <EyeOff className="h-3.5 w-3.5" />
                  {apiKey.key}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={apiKey.environment === "Live" ? "default" : "secondary"} className="text-[10px]">
                  {apiKey.environment}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(apiKey.created), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {apiKey.lastUsed ? format(new Date(apiKey.lastUsed), "MMM dd, yyyy") : "Never"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground focus:outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Key Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RotateCw className="mr-2 h-4 w-4 text-muted-foreground" /> Rotate Key
                    </DropdownMenuItem>
                    {apiKey.status === 'active' ? (
                      <DropdownMenuItem>
                        <PowerOff className="mr-2 h-4 w-4 text-muted-foreground" /> Disable
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <PowerOff className="mr-2 h-4 w-4 text-emerald-500" /> Enable
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
