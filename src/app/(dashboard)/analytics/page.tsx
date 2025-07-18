
"use client"

import { AnalyticsForm } from "@/components/analytics-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart } from "recharts";
import { Lightbulb } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 186 },
  { month: "Feb", sales: 305 },
  { month: "Mar", sales: 237 },
  { month: "Apr", sales: 273 },
  { month: "May", sales: 209 },
  { month: "Jun", sales: 214 },
];

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
}

const expenseData = [
    { category: 'Supplies', amount: 450, fill: 'var(--chart-1)' },
    { category: 'Marketing', amount: 320, fill: 'var(--chart-2)' },
    { category: 'Rent', amount: 500, fill: 'var(--chart-3)' },
    { category: 'Transport', amount: 275, fill: 'var(--chart-4)' },
    { category: 'Other', amount: 180, fill: 'var(--chart-5)' },
]

const expenseChartConfig = {
    amount: {
        label: "Amount",
    },
    supplies: {
        label: "Supplies",
        color: "hsl(var(--chart-1))",
    },
    marketing: {
        label: "Marketing",
        color: "hsl(var(--chart-2))",
    },
    rent: {
        label: "Rent",
        color: "hsl(var(--chart-3))",
    },
    transport: {
        label: "Transport",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    }
}


export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Business Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Visualize your performance and get AI-powered insights.
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
            <TabsTrigger value="overview">Visual Overview</TabsTrigger>
            <TabsTrigger value="ai-insights">
                <Lightbulb className="mr-2 h-4 w-4 text-accent" />
                AI Insights
            </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Sales Performance</CardTitle>
                        <CardDescription>Your sales over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={salesChartConfig} className="h-64 w-full">
                            <BarChart accessibilityLayer data={salesData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                        <CardDescription>How your expenses are distributed.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                         <ChartContainer config={expenseChartConfig} className="h-64 w-full">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
                                <Pie data={expenseData} dataKey="amount" nameKey="category" />
                            </PieChart>
                         </ChartContainer>
                    </CardContent>
                 </Card>
            </div>
        </TabsContent>
        <TabsContent value="ai-insights" className="mt-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight font-headline inline-flex items-center gap-2">
                        Actionable Analytics
                    </h2>
                    <p className="text-muted-foreground mt-1">
                    Get plain-English advice on what's selling, who your best customers are, and how to grow your business.
                    </p>
                </div>
                <AnalyticsForm />
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
