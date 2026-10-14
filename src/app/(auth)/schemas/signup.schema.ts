import z, { email } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, { error: "name is required" }),
    email: z
      .email({ error: "email is invalid please try another one" })
      .min(1, { error: "email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        },
      ),
    rePassword: z.string().min(1, { error: "confirm password is required" }),
    phone: z
      .string()
      .min(1, { error: "phone is required" })
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message:
          "Please enter a valid phone number with country code (e.g., +1234567890).",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "password and confirm password should be the same",
    path : ['rePassword']
  });
export type signupValues = z.infer<typeof signUpSchema >