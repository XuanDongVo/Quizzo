import z from "zod";

// Schema for user signup form validation
export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type SignupFormValues  = z.infer<typeof signupSchema>;


// Schema for user login form validation
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginFormValues  = z.infer<typeof loginSchema>;