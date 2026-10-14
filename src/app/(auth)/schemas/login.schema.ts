import z, { email } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "email is required" })
    .pipe(z.email({ error: "email is invalid please try another one" })),

  password: z
    .string()
    .min(1, { error: "Password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      },
    ),
});
export type loginValues = z.infer<typeof loginSchema >