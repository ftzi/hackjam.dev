import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Bruno Fantauzzi",
      role: "Full-Stack Developer",
      description:
        "Experienced developer with a passion for building innovative solutions.",
    },
    {
      name: "Raphael Novello",
      role: "UI/UX Developer",
      description:
        "Creative mind focused on crafting beautiful and functional user interfaces.",
    },
    {
      name: "Thiago Murtinho",
      role: "Backend Engineer",
      description:
        "Technical expert specializing in robust and scalable backend architectures.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold mb-2 text-center">About HackJam</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Our NextJS hackathon project built with passion and innovation
      </p>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <CardHeader className="flex flex-col items-center">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Our Hackathon Journey</h2>
        <p className="mb-4">
          This project was built during an exciting hackathon experience where
          we combined our skills to create an innovative solution. We focused on
          leveraging the latest technologies including Next.js, TypeScript, and
          Shadcn UI to deliver a seamless user experience.
        </p>
        <p>
          Our team worked collaboratively to overcome challenges and implement
          creative features that make our project stand out.
        </p>
      </section>
    </div>
  );
}
