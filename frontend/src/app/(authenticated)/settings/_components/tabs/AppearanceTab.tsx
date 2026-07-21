"use client";

import { useState } from "react";
import { mockAppearance } from "@/data/settings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";

interface AppearanceTabProps {
  onChange: () => void;
}

const colors = [
  { name: "blue", value: "bg-blue-600" },
  { name: "purple", value: "bg-purple-600" },
  { name: "green", value: "bg-emerald-600" },
  { name: "orange", value: "bg-orange-600" },
  { name: "rose", value: "bg-rose-600" },
];

export function AppearanceTab({ onChange }: AppearanceTabProps) {
  const [appearance, setAppearance] = useState(mockAppearance);
  const { setTheme } = useTheme();

  const handleThemeChange = (val: "light" | "dark" | "system") => {
    setAppearance({ ...appearance, theme: val });
    setTheme(val);
    onChange();
  };

  const handleColorChange = (color: string) => {
    setAppearance({ ...appearance, accentColor: color });
    onChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your workspace.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Theme</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["light", "dark", "system"].map((t) => (
              <button
                key={t}
                onClick={() => handleThemeChange(t as "light" | "dark" | "system")}
                className={cn(
                  "flex flex-col items-center justify-center p-4 border rounded-xl bg-card hover:border-primary/50 transition-colors",
                  appearance.theme === t ? "border-primary ring-1 ring-primary" : "border-border"
                )}
              >
                <div className="mb-3">
                  {t === "light" && (
                    <div className="w-16 h-12 bg-zinc-100 rounded-md border border-zinc-200 flex items-center justify-center shadow-sm">
                      <div className="w-8 h-4 bg-white rounded shadow-sm" />
                    </div>
                  )}
                  {t === "dark" && (
                    <div className="w-16 h-12 bg-zinc-900 rounded-md border border-zinc-800 flex items-center justify-center shadow-sm">
                      <div className="w-8 h-4 bg-zinc-800 rounded shadow-sm" />
                    </div>
                  )}
                  {t === "system" && (
                    <div className="w-16 h-12 bg-gradient-to-r from-zinc-100 to-zinc-900 rounded-md border border-zinc-200/50 flex items-center justify-center shadow-sm">
                      <div className="w-4 h-4 bg-white rounded shadow-sm mr-1" />
                      <div className="w-4 h-4 bg-zinc-800 rounded shadow-sm" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium capitalize">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Accent Color</Label>
          <div className="flex space-x-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => handleColorChange(c.name)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110",
                  c.value
                )}
              >
                {appearance.accentColor === c.name && (
                  <Check className="h-5 w-5 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Density</Label>
            <Select
              value={appearance.density}
              onValueChange={(val) => {
                setAppearance({ ...appearance, density: (val || "comfortable") as "comfortable" | "compact" });
                onChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select density" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comfortable">Comfortable (Default)</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select
              value={appearance.fontSize}
              onValueChange={(val) => {
                setAppearance({ ...appearance, fontSize: (val || "medium") as "small" | "medium" | "large" });
                onChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium (Default)</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-xl">
          <div className="space-y-0.5">
            <Label className="text-base">Reduce UI Animations</Label>
            <p className="text-sm text-muted-foreground">
              Turn off non-essential animations and transitions.
            </p>
          </div>
          <Switch
            checked={!appearance.animations}
            onCheckedChange={(val) => {
              setAppearance({ ...appearance, animations: !val });
              onChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
