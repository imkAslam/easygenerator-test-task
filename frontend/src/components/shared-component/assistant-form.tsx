import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AssistantForm() {
  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="account">Select GHL Account</Label>
        <Select id="account">
          <SelectTrigger>
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account1">Account 1</SelectItem>
            <SelectItem value="account2">Account 2</SelectItem>
            <SelectItem value="account3">Account 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Assistance Name</Label>
        <Input id="name" placeholder="Enter assistance name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Assistance Description</Label>
        <Textarea id="description" placeholder="Enter assistance description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Assistant Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select assistant type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type1">Type 1</SelectItem>
            <SelectItem value="type2">Type 2</SelectItem>
            <SelectItem value="type3">Type 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
