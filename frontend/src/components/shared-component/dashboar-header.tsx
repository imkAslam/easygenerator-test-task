import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const DashboardHeader: React.FC = () => {
  return (
    <header className="flex justify-end">
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Create new chat</span>
        </Button>
        <Button size="sm" className="h-8 gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Add GHL account</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
