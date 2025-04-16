import { FeatureCard } from "@/components/landing-page/feature-card"
import { StepCard } from "@/components/landing-page/step-card"
import { TestimonialCard } from "@/components/landing-page/testimonial-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Code2, Cpu, Globe, Zap } from "lucide-react"
import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium mb-6">Introducing Hackathon Manager</span>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Empowering Hackathons with
              <br />
              Modern Web Solutions
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mb-8">
              A platform for creating and managing hackathons, enabling participants to register and form teams. Built with
              Next.js 15 and integrated with Supabase, Better Auth, OpenAI, and Sentry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/event-list">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-16 w-full max-w-4xl">
              <Image
                src="/hackjam-hero.png"
                alt="HackJam Hero Section"
                className="object-cover w-full h-full rounded-md"
                width={896}
                height={504}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container px-2 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Key Features for Hackathon Success
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground">
                Designed to deliver high-quality, fast, and innovative applications aligned with hackathon criteria.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Optimized Performance"
                description="Built with Next.js 15 for unmatched speed and efficiency."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="Global Accessibility"
                description="Deploy seamlessly to a global edge network for minimal latency."
              />
              <FeatureCard
                icon={<Cpu className="h-10 w-10 text-primary" />}
                title="AI Integration"
                description="Leverage OpenAI for smarter development and innovative solutions."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
                title="Secure Authentication"
                description="Powered by Better Auth for robust and secure user management."
              />
              <FeatureCard
                icon={<Code2 className="h-10 w-10 text-primary" />}
                title="Error Monitoring"
                description="Integrated with Sentry for real-time error tracking and debugging."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Streamlined Workflow"
                description="Simplify development with pre-built components and APIs."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container px-2 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">How It Works</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground">
                Get started in minutes with our intuitive and efficient workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="01"
                title="Set Up Your Event"
                description="Create your hackathon with all the necessary details and configurations."
              />
              <StepCard
                number="02"
                title="Engage Participants"
                description="Enable participants to register, form teams, and collaborate effectively."
              />
              <StepCard
                number="03"
                title="Monitor and Evaluate"
                description="Track progress, manage submissions, and evaluate projects seamlessly."
              />
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container px-2 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Trusted by Hackathon Organizers Worldwide
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground">
                Join a growing community of organizers and participants building impactful hackathons.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="This platform revolutionized how we manage hackathons. The integration with modern tools is a game-changer."
                author="Alex Smith"
                role$="Event Organizer at InnovateHub"
                avatarSrc="/placeholder.svg?height=40&width=40"
              />
              <TestimonialCard
                quote="The AI-powered features and seamless deployment options made our event a huge success."
                author="Jamie Lee"
                role$="Tech Lead at CodeFest"
                avatarSrc="/placeholder.svg?height=40&width=40"
              />
              <TestimonialCard
                quote="Managing participants and tracking progress has never been easier. Highly recommend!"
                author="Taylor Brown"
                role$="Hackathon Coordinator at DevCon"
                avatarSrc="/placeholder.svg?height=40&width=40"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-2 md:px-6">
            <div className="rounded-xl bg-primary p-8 md:p-16 text-primary-foreground text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Host Your Hackathon?
              </h2>
              <p className="max-w-[700px] mx-auto mb-8 text-primary-foreground/80">
                Start building your event today with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8">
                  <Link href={"/event-list"}>
                    Events
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href={"/about"}>
                    About
                  </Link>
                </Button>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
