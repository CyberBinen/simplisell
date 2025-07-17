import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload } from "lucide-react";

const invoices = [
  { id: "INV001", customer: "Acme Inc", amount: "$250.00", status: "Paid", date: "2023-06-23" },
  { id: "INV002", customer: "Monsters Inc", amount: "$150.00", status: "Due", date: "2023-07-15" },
  { id: "INV003", customer: "Stark Industries", amount: "$350.00", status: "Overdue", date: "2023-06-01" },
  { id: "INV004", customer: "Wayne Enterprises", amount: "$450.00", status: "Paid", date: "2023-06-30" },
];

const expenses = [
  { id: 1, category: "Supplies", amount: "$45.00", date: "2023-06-20" },
  { id: 2, category: "Marketing", amount: "$120.00", date: "2023-06-18" },
  { id: 3, category: "Rent", amount: "$500.00", date: "2023-06-01" },
  { id: 4, category: "Transport", amount: "$75.00", date: "2023-06-28" },
];

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Financials</h1>
          <p className="text-muted-foreground">Manage your invoices and track expenses.</p>
        </div>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Your customer invoices.</CardDescription>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Create Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                         <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
                           {invoice.status}
                         </Badge>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>All your business expenses.</CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
