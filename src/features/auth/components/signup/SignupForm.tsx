"use client";
import { signUpSchema, signupValues } from "@/app/(auth)/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { signupAction } from "../../server/signup.actions";
import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { object } from "zod";
export default function SignupForm() {
  const router = useRouter();
  const { register, formState, handleSubmit , setError } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleRegister: SubmitHandler<signupValues> = async function (values) {
    const response = await signupAction(values);

    if (response.success == true) {
      toast.success(response.message);
      router.push(`/login`);
    }
    if (response.success == false) {
      if (response.fieldErrors) {
        for (const [key, messages] of Object.entries(response.fieldErrors)) {
          setError(key as keyof signupValues , {message:messages[0]})
        }

      }
    }
    setError('root' , {message:response.message})
  };
  // const handleError: SubmitErrorHandler<signupValues> = function (errors) {};

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
              {...register("name")}
            />
            {formState.errors.name && (
              <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.name.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
              {...register("email")}
            />
            {formState.errors.email && (
              <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.email.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
              {...register("password")}
            />
            {formState.errors.password && (
              <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.password.message}
                </p>
              </div>
            )}
            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div className={`progress bg-orange-500 w-50 h-full`}></div>
                </div>
                <span>Fair</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="rePassword"
              {...register("rePassword")}
            />
            {formState.errors.rePassword && (
              <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.rePassword.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
              {...register("phone")}
            />
            {formState.errors.phone && (
              <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.phone.message}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
              />
              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            {
              formState.errors.root && (
                <div>
                <p className="text-red-700 bg-red-100 px-2 py-1 rounded-md">
                  *{formState.errors.root.message}
                </p>
              </div>
              )
            }
          </div>

          <button
            type="submit"
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >
            <IconUserPlus stroke={2} />

            <span>Create My Account</span>
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
