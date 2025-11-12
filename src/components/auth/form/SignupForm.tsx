"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
// import {useRouter} from "next/navigation";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {FormInput} from "@/components/forms/from-input";
import {Form} from "@/components/ui/form";
import {signUpSchema, type SignUpFormValues} from "@/schemas/auth";
import {AuthHeader} from "@/components/auth/AuthHeader";

export default function SignUpForm() {
  //   const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (_data: SignUpFormValues) => {
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
    <div className="w-full mx-auto">
      <AuthHeader
        title="Create Account"
        description="Sign up to upload your files and get precise estimates in seconds."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              Signup with Google
            </span>
          </Button>

          {/* Separator */}
          <div className="relative flex items-center justify-center py-6">
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
          <FormInput
            control={form.control}
            name={`confirmPassword`}
            label={"Confirm Password"}
            placeholder="Enter your confirm password"
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
            className="w-full mt-4"
            disabled={isLoading}
          >
            <div className="flex flex-row gap-2">
              <span className="font-bold text-[18px] text-white">
                {isLoading ? "Signing up..." : "Sign Up"}
              </span>
              {!isLoading && <ArrowRight className="mt-1" />}
            </div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
