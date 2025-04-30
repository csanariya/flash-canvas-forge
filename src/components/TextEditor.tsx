
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TextEditorProps {
  primaryText: string;
  secondaryText: string;
  onPrimaryTextChange: (text: string) => void;
  onSecondaryTextChange: (text: string) => void;
}

const fontOptions = ["Default", "Modern", "Bold", "Elegant"];

const TextEditor = ({
  primaryText,
  secondaryText,
  onPrimaryTextChange,
  onSecondaryTextChange
}: TextEditorProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primary-text">Primary Text</Label>
        <Input
          id="primary-text"
          placeholder="Enter your main metric"
          value={primaryText}
          onChange={(e) => onPrimaryTextChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          The main metric or headline (keep it short)
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="secondary-text">Secondary Text</Label>
        <Textarea
          id="secondary-text"
          placeholder="Enter supporting text"
          value={secondaryText}
          onChange={(e) => onSecondaryTextChange(e.target.value)}
          className="min-h-[80px]"
        />
        <p className="text-sm text-muted-foreground">
          Additional context or description
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="font-style">Font Style</Label>
        <Select defaultValue="Default">
          <SelectTrigger id="font-style">
            <SelectValue placeholder="Select font style" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TextEditor;
