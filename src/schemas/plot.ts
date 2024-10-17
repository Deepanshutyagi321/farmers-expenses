import z from "zod";

export const ploteValidation = z.object({
    title: z.string()
})