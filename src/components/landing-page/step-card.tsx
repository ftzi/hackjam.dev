import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="relative border-none shadow-none bg-transparent">
      <CardHeader className="pb-2">
        <span className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
          {number}
        </span>
        <CardTitle className="text-xl relative z-10">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
