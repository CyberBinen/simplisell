import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

const portfolioItems = [
  { id: 1, title: "Wedding Photography", imageUrl: "https://placehold.co/600x400.png", hint: "wedding photography" },
  { id: 2, title: "Product Shoot", imageUrl: "https://placehold.co/600x400.png", hint: "product photography" },
  { id: 3, title: "Landscape Art", imageUrl: "https://placehold.co/600x400.png", hint: "landscape art" },
  { id: 4, title: "Portrait Session", imageUrl: "https://placehold.co/600x400.png", hint: "portrait photography" },
];

const products = [
  { id: 1, name: "Hand-woven Basket", price: "UGX 50,000", imageUrl: "https://placehold.co/600x400.png", hint: "woven basket" },
  { id: 2, name: "Beaded Necklace", price: "UGX 25,000", imageUrl: "https://placehold.co/600x400.png", hint: "beaded necklace" },
  { id: 3, name: "Clay Pot", price: "UGX 30,000", imageUrl: "https://placehold.co/600x400.png", hint: "clay pot" },
  { id: 4, name: "Printed Fabric", price: "UGX 40,000", imageUrl: "https://placehold.co/600x400.png", hint: "african fabric" },
];


export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Portfolio &amp; Shop</h1>
          <p className="text-muted-foreground">Showcase your work and sell your products.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Tabs defaultValue="portfolio">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio" className="mt-6">
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
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id}>
                 <CardContent className="p-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full rounded-t-lg object-cover"
                    data-ai-hint={product.hint}
                  />
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="font-bold text-primary">{product.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
