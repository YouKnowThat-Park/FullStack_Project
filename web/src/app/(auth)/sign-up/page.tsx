"use client";
import React from "react";
import { AuthInputField } from "../_components/AuthInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schemas/Sign-up_Schema";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
  birth_date: string;
}

export default function page() {
  const { register, handleSubmit, reset } = useForm<SignupFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Signup failed");

      const result = await res.json();
      console.log("User registered:", result);
      reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-300 w-full h-[600px] flex justify-center items-center"
    >
      <div className="flex flex-col w-[250px] gap-4 border p-4 bg-white">
        <AuthInputField label="Email" type="email" {...register("email")} />
        <AuthInputField
          label="Password"
          type="password"
          {...register("password")}
        />
        <AuthInputField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
        />
        <AuthInputField label="Name" type="text" {...register("name")} />
        <AuthInputField
          label="Phone Number"
          type="tel"
          {...register("phone_number")}
        />
        <AuthInputField
          label="Birth Day"
          type="date"
          {...register("birth_date")}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
