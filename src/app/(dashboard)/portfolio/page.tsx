import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const portfolioItems = [
  { id: 1, title: "Wedding Photography", imageUrl: "https://placehold.co/600x400.png", hint: "wedding photography" },
  { id: 2, title: "Product Shoot", imageUrl: "https://placehold.co/600x400.png", hint: "product photography" },
  { id: 3, title: "Landscape Art", imageUrl: "https://placehold.co/600x400.png", hint: "landscape art" },
  { id: 4, title: "Portrait Session", imageUrl: "https://placehold.co/600x400.png", hint: "portrait photography" },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Portfolio</h1>
          <p className="text-muted-foreground">Showcase your best work and creative projects.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Portfolio
        </Button>
      </div>

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
  );
}
