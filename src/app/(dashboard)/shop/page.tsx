
"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PlusCircle, Pencil, Trash2, Upload, Video, X, ImagePlus, ShoppingBag } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const mediaSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string(),
});

const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Product name is required."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  inventory: z.coerce.number().min(0, "Inventory must be a positive number."),
  coverImageUrl: z.string().optional(),
  media: z.array(mediaSchema).optional(),
  hint: z.string().optional(),
});

type Product = z.infer<typeof productSchema>;
type MediaItem = z.infer<typeof mediaSchema>;

const initialProducts: Product[] = [
  { id: 1, name: "Hand-woven Basket", description: "A beautiful and sturdy basket, hand-woven from local reeds. Perfect for shopping or home decor.", price: "UGX 50,000", inventory: 15, coverImageUrl: "https://placehold.co/600x400.png", media: [], hint: "woven basket" },
  { id: 2, name: "Beaded Necklace", description: "Vibrant, multi-colored beaded necklace crafted by local artisans. A unique statement piece.", price: "UGX 25,000", inventory: 32, coverImageUrl: "https://placehold.co/600x400.png", media: [], hint: "beaded necklace" },
  { id: 3, name: "Clay Pot", description: "Traditional clay pot, ideal for cooking or as a decorative item. Keeps water cool naturally.", price: "UGX 30,000", inventory: 20, coverImageUrl: "https://placehold.co/600x400.png", media: [], hint: "clay pot" },
  { id: 4, name: "Printed Fabric", description: "2-meter piece of high-quality, colorful African print fabric. Great for clothing or crafts.", price: "UGX 40,000", inventory: 8, coverImageUrl: "https://placehold.co/600x400.png", media: [], hint: "african fabric" },
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
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [mediaPreviews, setMediaPreviews] = useState<MediaItem[]>([]);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: "",
      inventory: 0,
      coverImageUrl: "",
      media: [],
      hint: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'cover' | 'additional') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (fileType === 'cover') {
          form.setValue("coverImageUrl", dataUrl);
          setCoverImagePreview(dataUrl);
        } else {
            const newMediaItem: MediaItem = {
                type: file.type.startsWith('video') ? 'video' : 'image',
                url: dataUrl
            };
            const currentMedia = form.getValues('media') || [];
            form.setValue('media', [...currentMedia, newMediaItem]);
            setMediaPreviews(prev => [...prev, newMediaItem]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMediaItem = (index: number) => {
    const currentMedia = form.getValues('media') || [];
    const updatedMedia = currentMedia.filter((_, i) => i !== index);
    form.setValue('media', updatedMedia);
    setMediaPreviews(updatedMedia);
  };

  const onSubmit = (data: Product) => {
    onSave(data);
    handleOpenChange(false);
  };
  
  useEffect(() => {
    if (isOpen) {
      const defaultValues = product || {
        name: "",
        description: "",
        price: "",
        inventory: 0,
        coverImageUrl: "",
        media: [],
        hint: "",
      };
      form.reset(defaultValues);
      setCoverImagePreview(defaultValues.coverImageUrl || null);
      setMediaPreviews(defaultValues.media || []);
    }
  }, [isOpen, product, form]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      if(onClose) onClose();
      form.reset();
      setCoverImagePreview(null);
      setMediaPreviews([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Make changes to your product here." : "Add a new product to your shop."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Label className="text-right pt-2">Cover Image</Label>
                <div className="col-span-3">
                     <Input 
                        id="coverImageUrl" 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        ref={coverImageInputRef}
                        onChange={(e) => handleFileChange(e, 'cover')}
                     />
                    <Button type="button" variant="outline" onClick={() => coverImageInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Cover Image
                    </Button>
                    {coverImagePreview && (
                        <div className="mt-2 relative w-24 h-24">
                            <Image src={coverImagePreview} alt="Image preview" layout="fill" className="rounded-md object-cover" />
                        </div>
                    )}
                 </div>
              </div>
               <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">More Media</Label>
                 <div className="col-span-3">
                    <Input 
                        id="media" 
                        type="file" 
                        accept="image/*,video/*"
                        className="hidden" 
                        ref={mediaInputRef}
                        onChange={(e) => handleFileChange(e, 'additional')}
                    />
                    <Button type="button" variant="outline" onClick={() => mediaInputRef.current?.click()}>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Add Image or Video
                    </Button>
                     <div className="mt-2 flex flex-wrap gap-2">
                        {mediaPreviews.map((media, index) => (
                            <div key={index} className="relative w-24 h-24">
                                {media.type === 'image' ? (
                                    <Image src={media.url} alt="Media preview" layout="fill" className="rounded-md object-cover" />
                                ) : (
                                    <video src={media.url} className="rounded-md object-cover w-full h-full" muted />
                                )}
                                <button type="button" onClick={() => removeMediaItem(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
            </form>
        </div>
        <DialogFooter className="p-6 pt-4 border-t bg-background sticky bottom-0">
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
    onSave, 
    onDelete 
}: { 
    product: Product; 
    onClose: () => void; 
    onSave: (product: Product) => void;
    onDelete: (productId: number) => void;
}) {
  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline">{product.name}</DialogTitle>
           <DialogClose asChild>
             <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6 -mr-6 pl-1 -ml-1 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Media Column */}
                <div className="space-y-4">
                    {product.coverImageUrl && product.coverImageUrl.startsWith('https') ? (
                    <div className="aspect-video relative w-full">
                        <Image 
                        src={product.coverImageUrl} 
                        alt={product.name} 
                        layout="fill"
                        className="rounded-lg object-cover w-full h-full" 
                        data-ai-hint={product.hint}
                        />
                    </div>
                    ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center w-full">
                        <p className="text-muted-foreground">No cover image</p>
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
                        <ProductForm product={product} onSave={onSave} onClose={onClose}>
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
                                    <AlertDialogAction onClick={() => { if(product.id) onDelete(product.id); onClose(); }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>

            {(product.media && product.media.length > 0) && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Additional Media</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        {product.media.map((item, index) => (
                            <div key={index} className="w-40 h-40 relative rounded-lg overflow-hidden">
                                {item.type === 'image' ? (
                                    <Image
                                        src={item.url}
                                        alt={`${product.name} media ${index + 1}`}
                                        layout="fill"
                                        className="object-cover"
                                    />
                                ) : (
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                )}
                            </div>
                        ))}
                    </CardContent>
                 </Card>
            )}
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
      setProducts(JSON.parse(storedProducts).map((p: Product) => ({...p, coverImageUrl: p.hint ? `https://placehold.co/600x400.png` : undefined, media: [] })));
    } else {
      setProducts(initialProducts);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) {
      // Create a version of products without the large Base64 data to avoid quota errors.
      const productsToStore = products.map(p => {
        const { coverImageUrl, media, ...remaningProductData } = p;
        // We only store the metadata, not the heavy media files.
        return remaningProductData;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productsToStore));
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
                {product.coverImageUrl ? (
                    <Image
                      src={product.coverImageUrl}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={product.hint}
                    />
                ) : (
                    <div className="aspect-[3/2] w-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                 {(product.media && product.media.some(m => m.type === 'video')) && <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5"><Video className="h-4 w-4 text-white"/></div>}
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
            onSave={handleEditProduct}
            onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}
