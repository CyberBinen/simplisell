"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateBusinessAdvice, GenerateBusinessAdviceInput } from "@/ai/flows/generate-business-advice";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  salesData: z.string().min(10, "Please provide more details about your sales."),
  customerData: z.string().min(10, "Please provide more details about your customers."),
  businessExpenses: z.string().min(10, "Please provide more details about your expenses."),
});

export function AnalyticsForm() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesData: "",
      customerData: "",
      businessExpenses: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAdvice(null);
    try {
      const result = await generateBusinessAdvice(values as GenerateBusinessAdviceInput);
      setAdvice(result.advice);
    } catch (error) {
      console.error("Error generating advice:", error);
      toast({
        title: "Error",
        description: "Failed to generate business advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Business Data Input</CardTitle>
          <CardDescription>
            Provide a summary of your business data. The more detail you provide, the better the advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="salesData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Data Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Best-selling items are hand-woven baskets. Sales are highest on weekends. Most customers pay with mobile money..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Data Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Repeat customers often buy beaded necklaces. New customers are mostly tourists. We have 5 VIP customers who buy in bulk..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Expenses Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Biggest expense is raw materials for baskets. Rent is paid monthly. We spent a small amount on social media ads..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Advice
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div>
                  <p className="font-semibold">Generating your personalized advice...</p>
                  <p className="text-sm text-muted-foreground">Our AI is analyzing your data. This may take a moment.</p>
                </div>
              </div>
            </CardContent>
         </Card>
      )}

      {advice && (
        <Card className="mt-6 bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline">Your Personalized Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-none text-foreground/90 whitespace-pre-wrap font-body">
              {advice}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
