import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Mail, Phone, Twitter, Instagram, Linkedin, Briefcase, MessageSquare } from "lucide-react";

const portfolioItems = [
  { id: 1, title: "Wedding Photography", imageUrl: "https://placehold.co/600x400.png", hint: "wedding photography" },
  { id: 2, title: "Product Shoot", imageUrl: "https://placehold.co/600x400.png", hint: "product photography" },
  { id: 3, title: "Landscape Art", imageUrl: "https://placehold.co/600x400.png", hint: "landscape art" },
  { id: 4, title: "Portrait Session", imageUrl: "https://placehold.co/600x400.png", hint: "portrait photography" },
];

const testimonials = [
    { id: 1, name: "Jane Doe", company: "Acme Inc.", quote: "The quality of work is simply outstanding. The attention to detail and creative flair brought our vision to life beyond our expectations. A true professional and a pleasure to work with." },
    { id: 2, name: "John Smith", company: "Monsters Inc.", quote: "Incredibly talented and reliable. They delivered on time and the final product was exceptional. I would highly recommend their services to anyone looking for top-tier creative work." },
    { id: 3, name: "Sarah Lee", company: "Stark Industries", quote: "Working with them was a seamless experience from start to finish. Their communication was clear, their ideas were innovative, and the results were stunning. We'll definitely be back for more." },
]

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Profile Section */}
      <section className="bg-card border rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start md:w-1/3 lg:w-1/4 space-y-4">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold font-headline">Your Name</h1>
                <p className="text-muted-foreground text-lg">Creative Professional</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                 </Button>
              </div>
              <Separator className="w-full" />
              <div className="w-full space-y-2 text-sm">
                <h3 className="font-semibold text-base">Contact Me</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>your.email@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+256 7XX XXX XXX</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 lg:w-3/4 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-2">About Me</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        I am a passionate creative with a knack for bringing ideas to life. With over five years of experience in the industry, I specialize in crafting unique and compelling visual stories. My work is driven by a love for detail and a commitment to excellence. I thrive on collaboration and am always excited to take on new challenges.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-headline mb-2">Services Offered</h2>
                     <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Bespoke Wedding Photography</li>
                        <li>Commercial Product Shoots</li>
                        <li>Stunning Landscape Artwork</li>
                        <li>Professional Portrait Sessions</li>
                    </ul>
                </div>
            </div>
          </div>
      </section>

      {/* My Work Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <Briefcase className="h-7 w-7 text-primary" />
                <h2 className="text-3xl font-bold font-headline">My Work</h2>
            </div>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Work
          </Button>
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.hint}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </CardContent>
                <CardFooter className="p-4 bg-card">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </CardFooter>
              </Card>
            ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold font-headline">What My Clients Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                    <CardContent className="p-6">
                        <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
                            {testimonial.quote}
                        </blockquote>
                        <p className="mt-4 text-right font-semibold">
                            &mdash; {testimonial.name}, <span className="text-muted-foreground font-normal">{testimonial.company}</span>
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
