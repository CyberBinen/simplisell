
"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { PlusCircle, Pencil, Trash2, Upload, Video, X, ImagePlus, ShoppingBag, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

const mediaSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string(),
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Product name is required."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  inventory: z.coerce.number().min(0, "Inventory must be a positive number."),
  coverImageUrl: z.string().optional(),
  media: z.array(mediaSchema).optional(),
  hint: z.string().optional(),
  createdAt: z.any().optional(),
});

type Product = z.infer<typeof productSchema>;
type MediaItem = z.infer<typeof mediaSchema>;

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
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Make changes to your product here." : "Add a new product to your shop."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <form className="space-y-4 px-6 py-4">
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
        <DialogFooter className="p-6 border-t bg-background sticky bottom-0">
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
    onDelete: (productId: string) => void;
}) {
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAddMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const newMediaItem: MediaItem = {
          type: file.type.startsWith('video') ? 'video' : 'image',
          url: dataUrl
        };
        const currentMedia = product.media || [];
        const updatedProduct = {
          ...product,
          media: [...currentMedia, newMediaItem],
        };
        onSave(updatedProduct);
        toast({ title: "Success", description: "Media added successfully." });
      };
      reader.onerror = () => {
        toast({ title: "Error", description: "Failed to read file.", variant: "destructive" });
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold font-headline">{product.name}</DialogTitle>
           <DialogClose asChild>
             <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Media Column */}
                <div className="space-y-4">
                    {product.coverImageUrl ? (
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

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-xl">Additional Media</CardTitle>
                        <CardDescription>More images and videos of your product.</CardDescription>
                    </div>
                    <Input 
                        id="add-media" 
                        type="file" 
                        accept="image/*,video/*"
                        className="hidden" 
                        ref={mediaInputRef}
                        onChange={handleAddMedia}
                    />
                    <Button variant="outline" onClick={() => mediaInputRef.current?.click()}>
                        <ImagePlus className="mr-2 h-4 w-4" /> Add Media
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {(product.media && product.media.length > 0) ? (
                        product.media.map((item, index) => (
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
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm">No additional media has been added yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({ 
            ...data, 
            id: doc.id,
            media: data.media || [] // ensure media is always an array
        } as Product);
      });
      setProducts(productsData);
      setIsLoaded(true);
    }, (error) => {
        console.error("Firestore snapshot error:", error);
        toast({
            title: "Error loading products",
            description: "Could not fetch products from the database. Please check your connection and permissions.",
            variant: "destructive",
        });
        setIsLoaded(true); // Set to true to stop showing loader on error
    });

    return () => unsubscribe();
  }, [toast]);

  const handleAddProduct = async (data: Product) => {
    try {
      // Don't save the id field, firestore will generate it.
      const { id, ...productData } = data;
      await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: Timestamp.now(),
      });
      toast({ title: "Success", description: "Product added successfully." });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({ title: "Error", description: "Failed to add product.", variant: "destructive" });
    }
  };
  
  const handleEditProduct = async (data: Product) => {
    if (!data.id) {
        toast({ title: "Error", description: "Product ID is missing.", variant: "destructive" });
        return;
    }
    try {
        const { id, ...productData } = data;
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, productData);
        toast({ title: "Success", description: "Product updated successfully." });
        // The real-time listener will update the state, but we can update the selected product view instantly.
        setSelectedProduct(data);
    } catch (error) {
        console.error("Error updating product:", error);
        toast({ title: "Error", description: "Failed to update product.", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
     try {
        await deleteDoc(doc(db, "products", productId));
        toast({ title: "Success", description: "Product deleted successfully." });
        setSelectedProduct(null);
     } catch (error) {
        console.error("Error deleting product:", error);
        toast({ title: "Error", description: "Failed to delete product.", variant: "destructive" });
     }
  };

  if (!isLoaded) {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
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
 