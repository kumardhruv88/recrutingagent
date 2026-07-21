"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { mockInvoices } from "@/data/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Invoice History</h2>
        <p className="text-muted-foreground mt-1">
          View and download your past billing invoices.
        </p>
      </div>

      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((invoice) => {
              const formattedDate = new Date(invoice.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              
              return (
                <TableRow key={invoice.id} className="cursor-pointer group" onClick={() => setSelectedInvoice(invoice)}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // mock download action
                      }}
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Invoice Detail Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        {selectedInvoice && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoice {selectedInvoice.id}
              </DialogTitle>
              <DialogDescription>
                Billed on {new Date(selectedInvoice.date).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Billed to:</p>
                  <p className="text-sm text-muted-foreground">HireMind AI Organization</p>
                  <p className="text-sm text-muted-foreground">123 Tech Street, Suite 400</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94107</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold">Payment Method:</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.paymentMethod}</p>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.lineItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-sm">{item.description}</TableCell>
                        <TableCell className="text-right text-sm font-medium">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">${selectedInvoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-between mt-2">
              <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </motion.div>
  );
}
