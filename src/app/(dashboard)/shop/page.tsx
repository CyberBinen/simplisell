import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const products = [
  { id: 1, name: "Hand-woven Basket", price: "UGX 50,000", imageUrl: "https://placehold.co/600x400.png", hint: "woven basket" },
  { id: 2, name: "Beaded Necklace", price: "UGX 25,000", imageUrl: "https://placehold.co/600x400.png", hint: "beaded necklace" },
  { id: 3, name: "Clay Pot", price: "UGX 30,000", imageUrl: "https://placehold.co/600x400.png", hint: "clay pot" },
  { id: 4, name: "Printed Fabric", price: "UGX 40,000", imageUrl: "https://placehold.co/600x400.png", hint: "african fabric" },
];

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Shop</h1>
          <p className="text-muted-foreground">Manage and sell your products.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
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
    </div>
  );
}
