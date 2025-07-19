"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

// Mock data for now, this will be replaced with Firestore data
const customers = [
  { id: "CUS001", name: "Liam Johnson", email: "liam@example.com", totalSpent: 250.00, orders: 1, since: "2023-06-23" },
  { id: "CUS002", name: "Olivia Smith", email: "olivia@example.com", totalSpent: 150.00, orders: 1, since: "2023-06-24" },
  { id: "CUS003", name: "Noah Williams", email: "noah@example.com", totalSpent: 350.00, orders: 2, since: "2023-06-01" },
  { id: "CUS004", name: "Emma Brown", email: "emma@example.com", totalSpent: 450.00, orders: 3, since: "2023-05-15" },
  { id: "CUS005", name: "Oliver Jones", email: "oliver@example.com", totalSpent: 75.00, orders: 1, since: "2023-07-01" },
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>An overview of all your customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Orders</TableHead>
                <TableHead className="hidden md:table-cell">Member Since</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://placehold.co/36x36.png?text=${customer.name.charAt(0)}`} alt="Avatar" data-ai-hint="avatar" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{customer.orders}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.since}</TableCell>
                  <TableCell className="text-right font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
