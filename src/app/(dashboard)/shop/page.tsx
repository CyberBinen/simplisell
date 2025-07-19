
"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
import { PlusCircle, Pencil, Trash2, Upload, Video, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Product name is required."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  inventory: z.coerce.number().min(0, "Inventory must be a positive number."),
  imageUrl: z.string().min(1, "Please upload an image."),
  videoUrl: z.string().optional(),
  hint: z.string().optional(),
});

type Product = z.infer<typeof productSchema>;

const initialProducts: Product[] = [
  { id: 1, name: "Hand-woven Basket", description: "A beautiful and sturdy basket, hand-woven from local reeds. Perfect for shopping or home decor.", price: "UGX 50,000", inventory: 15, imageUrl: "https://placehold.co/600x400.png", hint: "woven basket", videoUrl: "" },
  { id: 2, name: "Beaded Necklace", description: "Vibrant, multi-colored beaded necklace crafted by local artisans. A unique statement piece.", price: "UGX 25,000", inventory: 32, imageUrl: "https://placehold.co/600x400.png", hint: "beaded necklace", videoUrl: "" },
  { id: 3, name: "Clay Pot", description: "Traditional clay pot, ideal for cooking or as a decorative item. Keeps water cool naturally.", price: "UGX 30,000", inventory: 20, imageUrl: "https://placehold.co/600x400.png", hint: "clay pot", videoUrl: "" },
  { id: 4, name: "Printed Fabric", description: "2-meter piece of high-quality, colorful African print fabric. Great for clothing or crafts.", price: "UGX 40,000", inventory: 8, imageUrl: "https://placehold.co/600x400.png", hint: "african fabric", videoUrl: "" },
];

function ProductForm({
  product,
  onSave,
  onClose,
  children,
}: {
  product?: Product | null;
  onSave: (data: Product) => void;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: "",
      inventory: 0,
      imageUrl: "",
      videoUrl: "",
      hint: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue("imageUrl", dataUrl);
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue("videoUrl", dataUrl);
        setVideoPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: Product) => {
    onSave(data);
    setIsOpen(false);
    if(onClose) onClose();
    form.reset();
    setImagePreview(null);
    setVideoPreview(null);
  };
  
  useEffect(() => {
    if (isOpen) {
      const defaultValues = product || {
        name: "",
        description: "",
        price: "",
        inventory: 0,
        imageUrl: "",
        videoUrl: "",
        hint: "",
      };
      form.reset(defaultValues);
      setImagePreview(defaultValues.imageUrl || null);
      setVideoPreview(defaultValues.videoUrl || null);
    }
  }, [isOpen, product, form]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Make changes to your product here." : "Add a new product to your shop."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto -mr-6 pr-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" {...form.register("name")} className="col-span-3" />
                {form.formState.errors.name && <p className="col-span-4 text-red-500 text-xs text-right">{form.formState.errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                <Textarea id="description" {...form.register("description")} className="col-span-3" />
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
               <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Image</Label>
                <div className="col-span-3">
                     <Input 
                        id="image" 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        ref={imageInputRef}
                        onChange={handleImageChange}
                     />
                    <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                    </Button>
                    {imagePreview && (
                        <div className="mt-2">
                            <Image src={imagePreview} alt="Product preview" width={100} height={100} className="rounded-md object-cover aspect-square" />
                        </div>
                    )}
                     {form.formState.errors.imageUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageUrl.message}</p>}
                 </div>
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Video</Label>
                <div className="col-span-3">
                     <Input 
                        id="video" 
                        type="file" 
                        accept="video/*"
                        className="hidden" 
                        ref={videoInputRef}
                        onChange={handleVideoChange}
                     />
                    <Button type="button" variant="outline" onClick={() => videoInputRef.current?.click()}>
                        <Video className="mr-2 h-4 w-4" />
                        Upload Video
                    </Button>
                    {videoPreview && (
                        <div className="mt-2">
                            <video src={videoPreview} width="200" className="rounded-md" controls />
                        </div>
                    )}
                 </div>
              </div>
            </form>
        </div>
        <DialogFooter className="mt-auto pt-4 border-t border-border -ml-6 -mr-6 -mb-6 px-6 pb-6">
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProductDetailView({ 
    product, 
    onClose, 
    onEdit, 
    onDelete 
}: { 
    product: Product; 
    onClose: () => void; 
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}) {
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-10">
          <DialogTitle className="text-2xl font-bold font-headline">{product.name}</DialogTitle>
          <DialogClose asChild>
             <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow grid md:grid-cols-2 gap-8 overflow-y-auto pr-6 -mr-6 pl-1 -ml-1">
          {/* Media Column */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-muted-foreground">Product Image</Label>
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={800} 
                height={600}
                className="rounded-lg object-cover w-full aspect-[4/3] mt-2 border" 
                data-ai-hint={product.hint}
              />
            </div>
            {product.videoUrl && (
              <div>
                <Label className="text-sm font-semibold text-muted-foreground">Product Video</Label>
                <video src={product.videoUrl} className="rounded-lg w-full mt-2 border" controls />
              </div>
            )}
          </div>
          {/* Details Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold font-headline">Description</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{product.description || "No description provided."}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold font-headline">Price</h3>
                <p className="text-2xl font-bold text-primary mt-2">{product.price}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-headline">Inventory</h3>
                <p className="text-2xl font-bold mt-2">{product.inventory} units</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-4 pt-4">
                <ProductForm product={product} onSave={onEdit} onClose={onClose}>
                    <Button>
                        <Pencil className="mr-2 h-4 w-4"/> Edit Product
                    </Button>
                </ProductForm>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Product
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
                            <AlertDialogAction onClick={() => { onDelete(product.id!); onClose(); }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const LOCAL_STORAGE_KEY = "simplibiz_products";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const handleAddProduct = (data: Product) => {
    const newProduct: Product = {
      ...data,
      id: Math.max(0, ...products.map(p => p.id || 0)) + 1,
    };
    setProducts([newProduct, ...products]);
  };
  
  const handleEditProduct = (data: Product) => {
    setProducts(products.map(p => p.id === data.id ? data : p));
    setSelectedProduct(data); // Update the selected product view as well
  };

  const handleDeleteProduct = (productId: number) => {
     setProducts(products.filter(p => p.id !== productId));
     setSelectedProduct(null);
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

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
          <Card key={product.id} className="overflow-hidden group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <CardContent className="p-0 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={product.hint}
                />
                 {product.videoUrl && <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5"><Video className="h-4 w-4 text-white"/></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-colors" />
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

       {selectedProduct && (
        <ProductDetailView 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}

    