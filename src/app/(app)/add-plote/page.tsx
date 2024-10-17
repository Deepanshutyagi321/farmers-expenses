"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ploteValidation } from "@/schemas/plot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";




export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ploteValidation>>({
    resolver: zodResolver(ploteValidation),
    defaultValues: {
      title: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof ploteValidation>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/plote", data);
      if (response.data.success) {
        toast({
          title: response.data.message,
          description: "Plot created successfully",
          duration: 2000,
        })
        router.push('/get-plot');
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Plot</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter plot title" {...field} className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
