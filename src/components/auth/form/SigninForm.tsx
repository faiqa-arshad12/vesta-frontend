"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
// import {useRouter} from "next/navigation";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {FormInput} from "@/components/forms/from-input";
import {Form} from "@/components/ui/form";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  //   const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      //   const result = await signIn("credentials", {
      //     email: data.email,
      //     password: data.password,
      //     redirect: false,
      //   });
      //   if (result?.error) {
      //     setError("Invalid email or password. Please try again.");
      //     setIsLoading(false);
      //   } else if (result?.ok) {
      //     router.push("/dashboard");
      //     router.refresh();
      //   }
    } catch {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      //   await signIn("google", {
      //     callbackUrl: "/dashboard",
      //   });
    } catch {
      setError("An error occurred with Google sign-in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black-text mb-2">
          Welcome Back!
        </h1>
        <p className="text-light-gray text-[18px] font-normal">
          Log in to upload your files and get precise estimates in seconds.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Google Sign-in Button */}
          <Button
            type="button"
            variant="link"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Image
              src="/assets/images/google.png"
              alt="Vesta Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-foreground font-normal text-[18px]">
              Signin with Google
            </span>
          </Button>

          {/* Separator */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-input-border"></div>
            </div>
            <div className="relative bg-white px-4">
              <span className="text-black-text text-sm">Or</span>
            </div>
          </div>

          {/* Email Input */}
          <FormInput
            control={form.control}
            name={`email`}
            label={"Email"}
            placeholder="Enter your email"
            type="email"
          />

          <FormInput
            control={form.control}
            name={`password`}
            label={"Password"}
            placeholder="Enter your password"
            type="password"
          />
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Sign-in Button */}
          <Button
            type="submit"
            variant={"default"}
            className="w-full"
            disabled={isLoading}
          >
            <div className="flex flex-row gap-2">
              <span className="font-bold text-[18px] text-white">
                {isLoading ? "Signing in..." : "Signin"}
              </span>
              {!isLoading && <ArrowRight className="mt-1" />}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
