
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Product name is required."),
  price: z.string().min(1, "Price is required."),
  inventory: z.coerce.number().min(0, "Inventory must be a positive number."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  hint: z.string().optional(),
});

type Product = z.infer<typeof productSchema>;

const initialProducts: Product[] = [
  { id: 1, name: "Hand-woven Basket", price: "UGX 50,000", inventory: 15, imageUrl: "https://placehold.co/600x400.png", hint: "woven basket" },
  { id: 2, name: "Beaded Necklace", price: "UGX 25,000", inventory: 32, imageUrl: "https://placehold.co/600x400.png", hint: "beaded necklace" },
  { id: 3, name: "Clay Pot", price: "UGX 30,000", inventory: 20, imageUrl: "https://placehold.co/600x400.png", hint: "clay pot" },
  { id: 4, name: "Printed Fabric", price: "UGX 40,000", inventory: 8, imageUrl: "https://placehold.co/600x400.png", hint: "african fabric" },
];

function ProductForm({
  product,
  onSave,
  children,
}: {
  product?: Product | null;
  onSave: (data: Product) => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      price: "",
      inventory: 0,
      imageUrl: "https://placehold.co/600x400.png",
      hint: "",
    },
  });

  const onSubmit = (data: Product) => {
    onSave(data);
    setIsOpen(false);
    form.reset();
  };
  
  // When the dialog opens, reset the form with the product's data
  useEffect(() => {
    if (isOpen) {
      form.reset(product || {
        name: "",
        price: "",
        inventory: 0,
        imageUrl: "https://placehold.co/600x400.png",
        hint: "",
      });
    }
  }, [isOpen, product, form]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Make changes to your product here." : "Add a new product to your shop."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" {...form.register("name")} className="col-span-3" />
            {form.formState.errors.name && <p className="col-span-4 text-red-500 text-xs text-right">{form.formState.errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" {...form.register("price")} className="col-span-3" />
             {form.formState.errors.price && <p className="col-span-4 text-red-500 text-xs text-right">{form.formState.errors.price.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inventory" className="text-right">Inventory</Label>
            <Input id="inventory" type="number" {...form.register("inventory")} className="col-span-3" />
             {form.formState.errors.inventory && <p className="col-span-4 text-red-500 text-xs text-right">{form.formState.errors.inventory.message}</p>}
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
            <Input id="imageUrl" {...form.register("imageUrl")} className="col-span-3" />
            {form.formState.errors.imageUrl && <p className="col-span-4 text-red-500 text-xs text-right">{form.formState.errors.imageUrl.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleAddProduct = (data: Product) => {
    const newProduct: Product = {
      ...data,
      id: Math.max(0, ...products.map(p => p.id || 0)) + 1,
    };
    setProducts([newProduct, ...products]);
  };
  
  const handleEditProduct = (data: Product) => {
    setProducts(products.map(p => p.id === data.id ? data : p));
  };

  const handleDeleteProduct = (productId: number) => {
     setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Shop</h1>
          <p className="text-muted-foreground">Manage and sell your products.</p>
        </div>
        <ProductForm onSave={handleAddProduct}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </ProductForm>
      </div>
      <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={product.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-colors" />
                 <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ProductForm product={product} onSave={handleEditProduct}>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Product</span>
                        </Button>
                    </ProductForm>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button size="icon" variant="destructive" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete Product</span>
                          </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this product from your shop.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id!)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
                <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">Inventory: {product.inventory}</p>
                </div>
                <p className="font-bold text-primary">{product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
