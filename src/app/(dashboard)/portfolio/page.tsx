import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Mail, Phone, Twitter, Instagram, Linkedin } from "lucide-react";

const portfolioItems = [
  { id: 1, title: "Wedding Photography", imageUrl: "https://placehold.co/600x400.png", hint: "wedding photography" },
  { id: 2, title: "Product Shoot", imageUrl: "https://placehold.co/600x400.png", hint: "product photography" },
  { id: 3, title: "Landscape Art", imageUrl: "https://placehold.co/600x400.png", hint: "landscape art" },
  { id: 4, title: "Portrait Session", imageUrl: "https://placehold.co/600x400.png", hint: "portrait photography" },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">My Portfolio</h1>
          <p className="text-muted-foreground">Your personal space to showcase your talent.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://placehold.co/96x96.png" alt="User" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">Your Name</h2>
              <p className="text-muted-foreground">Creative Professional</p>
              <div className="flex gap-4 mt-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2">About Me</h3>
              <p className="text-muted-foreground mb-4">
                I am a passionate creative with a knack for bringing ideas to life. With over five years of experience in the industry, I specialize in crafting unique and compelling visual stories. My work is driven by a love for detail and a commitment to excellence.
              </p>
              <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Bespoke Wedding Photography</li>
                <li>Commercial Product Shoots</li>
                <li>Stunning Landscape Artwork</li>
                <li>Professional Portrait Sessions</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">Contact Me</h3>
              <div className="flex flex-col space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>your.email@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+256 7XX XXX XXX</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">My Work</h2>
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full rounded-t-lg object-cover"
                  data-ai-hint={item.hint}
                />
              </CardContent>
              <CardFooter className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
