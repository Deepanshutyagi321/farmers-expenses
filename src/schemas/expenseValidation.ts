import z from "zod";

export const expenseValidation = z.object({
    price: z.number(),
    Date: z.date(),
    metrial: z.string().min(2,{message:"content must be atlest 2 characters"})
    .max(300,{message:"content must be no longer then 300 characters"}),
    labourCost: z.number(),
    });