"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { expenseValidation } from "@/schemas/expenseValidation";
import { Loader2 } from "lucide-react";

// Define the type for an expense object
interface Expense {
  _id: string;
  metrial: string;
  labourCost: number;
  price: number;
  createdAt: string;
}

export default function Expenses({ params }: { params: { id: string } }) {
  const [expenses, setExpenses] = useState<Expense[]>([]); // Set the explicit type
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const ploteId = params.id;
  const { toast } = useToast();

  // Fetch expenses data
  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/get-expenses", {
          params: { id: ploteId },
        });

        setExpenses(response.data.expenses);
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, [ploteId]);

  // Form validation setup
  const form = useForm<z.infer<typeof expenseValidation>>({
    resolver: zodResolver(expenseValidation),
    defaultValues: {
      price: 0,
      Date: new Date(),
      metrial: "",
      labourCost: 0,
    },
  });

  // Handle form submission for adding or updating expense
  const onSubmit = async (data: z.infer<typeof expenseValidation>) => {
    try {
      setButtonLoading(true);
      const response = await axios.post("/api/add-expenses", { data, ploteId });
      if (response.data.success) {
        toast({
          title: response.data.message,
          description: "The expense has been added successfully.",
          duration: 2000,
        });
        setOpen(false);
        setButtonLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding/updating expense:", error);
    }
  };

  // Handle delete expense
  const handleDelete = async (expenseId: string, ploteId: string) => {
    try {
      const response = await axios.delete(`/api/delete-expenses`, {
        data: { expenseId, ploteId },
      });

      if (response.data.success) {
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
        toast({
          title: response.data.message,
          description: "The expense has been deleted successfully.",
          duration: 2000,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast({
        title: "Error deleting expense",
        description: "An error occurred while deleting the expense.",
        duration: 2000,
      });
    }
  };

  // Calculate totals for both labour cost and price
  const totalLabourCost = expenses.reduce((acc, expense) => acc + expense.labourCost, 0);
  const totalPrice = expenses.reduce((acc, expense) => acc + expense.price, 0);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(!open)} className="mb-4">
        {!open ? "Add Expense" : "Close"}
      </Button>
      {open && (
        <div className="mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="metrial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material </FormLabel>
                    <FormControl>
                      <Input placeholder="Material" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labourCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labour Cost &#8377;</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Labour Cost"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Price &#8377;</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Material Price"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {buttonLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Add Expense
              </Button>
            </form>
          </Form>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Expenses List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Material</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Labour Cost</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="border border-gray-300 px-4 py-2">{expense.metrial}</td>
                <td className="border border-gray-300 px-4 py-2">{expense.labourCost || 0}</td>
                <td className="border border-gray-300 px-4 py-2">{expense.price || 0}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(expense.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <AlertDialog>
                    <AlertDialogTrigger className="hover:cursor-pointer hover:font-bold">
                      Remove
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your data field
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(expense._id, ploteId)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold">
              <td className="border border-gray-300 px-4 py-2 text-center">Total</td>
              <td className="border border-gray-300 px-4 py-2">&#8377; {totalLabourCost}</td>
              <td className="border border-gray-300 px-4 py-2">&#8377; {totalPrice}</td>
              <td className="border border-gray-300 px-4 py-2">&#8377; {totalPrice + totalLabourCost}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
