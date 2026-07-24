"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const performanceData = [
  { id: 1, name: "David Lee", role: "Senior Recruiter", interviews: 45, timeToHire: 14, conversion: 92, avatar: "/avatars/david.png", initials: "DL" },
  { id: 2, name: "Jessica Park", role: "Technical Recruiter", interviews: 38, timeToHire: 16, conversion: 88, avatar: "/avatars/jessica.png", initials: "JP" },
  { id: 3, name: "Sam Wilson", role: "Sourcing Specialist", interviews: 52, timeToHire: 21, conversion: 75, avatar: "/avatars/sam.png", initials: "SW" },
  { id: 4, name: "Emily Rodriguez", role: "Recruiting Coordinator", interviews: 24, timeToHire: 18, conversion: 82, avatar: "/avatars/emily.png", initials: "ER" }
];

export function RecruiterPerformance() {
  return (
    <Card className="shadow-sm border-border rounded-xl">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recruiter Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-muted/30 border-y border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Recruiter</th>
                <th className="px-6 py-3 font-medium text-right">Interviews Conducted</th>
                <th className="px-6 py-3 font-medium text-right">Avg Time-to-Hire</th>
                <th className="px-6 py-3 font-medium text-right">Offer Conversion</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((recruiter, index) => (
                <tr key={recruiter.id} className={`border-b border-border/50 hover:bg-muted/50 transition-colors duration-200 ${index === performanceData.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={recruiter.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">{recruiter.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{recruiter.name}</p>
                      <p className="text-xs text-muted-foreground">{recruiter.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-foreground">{recruiter.interviews}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-foreground">{recruiter.timeToHire} days</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      recruiter.conversion >= 90 ? 'bg-success/10 text-success' : 
                      recruiter.conversion >= 80 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 
                      'bg-warning/10 text-warning'
                    }`}>
                      {recruiter.conversion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
