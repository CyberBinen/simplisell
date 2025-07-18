import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, FileText } from "lucide-react";

const transactions = [
  { type: "Invoice", id: "INV001", customer: "Acme Inc", amount: 250.00, status: "Paid", date: "2023-06-23" },
  { type: "Expense", id: "EXP001", customer: "MTN (Airtime)", amount: -15.00, status: "Paid", date: "2023-06-22" },
  { type: "Invoice", id: "INV002", customer: "Monsters Inc", amount: 150.00, status: "Due", date: "2023-07-15" },
  { type: "Expense", id: "EXP002", customer: "Local Market (Supplies)", amount: -45.00, status: "Paid", date: "2023-06-20" },
  { type: "Invoice", id: "INV003", customer: "Stark Industries", amount: 350.00, status: "Overdue", date: "2023-06-01" },
  { type: "Expense", id: "EXP003", customer: "Marketing Flyers", amount: -30.00, status: "Paid", date: "2023-06-18" },
  { type: "Invoice", id: "INV004", customer: "Wayne Enterprises", amount: 450.00, status: "Paid", date: "2023-06-30" },
];

export default function FinancePage() {
  const totalInvoiced = transactions
    .filter(t => t.type === 'Invoice')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalInvoiced + totalExpenses;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Financials</h1>
          <p className="text-muted-foreground">Track your income, expenses, and overall balance.</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

       <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvoiced.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Income from customer invoices.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.abs(totalExpenses).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total business spending.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${netBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Your current profit or loss.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A log of all your invoices and expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge variant={transaction.type === 'Invoice' ? 'secondary' : 'outline'}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.customer}</TableCell>
                  <TableCell>
                     <Badge variant={transaction.status === 'Paid' ? 'default' : transaction.status === 'Overdue' ? 'destructive' : 'secondary'}>
                       {transaction.status}
                     </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                   <TableCell className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? `+` : ''}${transaction.amount.toFixed(2)}
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
