"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@heroui/react";
import { User2Icon, UserX2Icon } from "lucide-react";
import UserIcon from "@/icons/userIcon";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Invalid email").nonempty("Email is required"),

  password: z.string("Invalid password").nonempty("Password is required"),
  // .min(8, "Password must be at least 8 characters")
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
  //   "Password must contain uppercase, lowercase, number, and special character"
  // ),
});
type FormFields = z.infer<typeof formSchema>;

export function LoginForm() {
  // 1. setup form
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. submit handler
  function onSubmit(values: FormFields) {
    console.log(values);
  }

  return (
    <Card className="p-8 pt-10 w-sm">
      <div className="mx-auto mb-4">
        <User2Icon size={48} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="user@exampil.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer w-full">
            Submit
          </Button>
        </form>
      </Form>

      <span className="text-sm text-gray-700 dark:text-amber-100 p-4 mx-auto">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 dark:text-amber-700 hover:underline font-medium"
        >
          Register now
        </Link>
      </span>
    </Card>
  );
}
