import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Bruno Fantauzzi",
      role: "Full-Stack Engineer",
      description:
        "Experienced developer with a passion for building innovative solutions and great experiences.",
      github: "ftzi",
      linkedin: "fantauzzi",
    },
    {
      name: "Thiago Murtinho",
      role: "Full-Stack Engineer",
      description:
        "Technical expert specializing in leading teams and managing projects.",
      github: "thiagomurtinho",
      linkedin: "thiagomurtinho",
    },
    {
      name: "Raphael Novello",
      role: "Backend Engineer",
      description:
        "Creative mind focused on designing system functionalities and having a great vision for the final product.",
      github: "RaphaelAN",
      linkedin: "raphaelnovello",
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
              <CardContent className="text-center flex flex-col items-center h-full justify-between">
                <p >{member.description}</p>
                <div className="mt-4 flex justify-center gap-4">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm hover:underline"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    {member.github}
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm hover:underline"
                  >
                    <Linkedin className="mr-1 h-4 w-4" />
                    {member.linkedin}
                  </a>
                </div>
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
