import AssistantForm from "@/components/shared-component/assistant-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Assistants: React.FC = () => {
  return (
    <section className="flex items-center justify-center w-full h-[90dvh] ">
      <Card className="w-full max-w-[80vw] ">
        <CardHeader>
          <CardTitle className="text-2xl">Assistants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AssistantForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default Assistants;
