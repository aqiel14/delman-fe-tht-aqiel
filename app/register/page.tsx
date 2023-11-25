"use client";
import ContentHeader from "@/components/ContentHeader";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createUser } from "@/lib/api";
import { CreateUserInputType } from "@/lib/types";
import { isValidEmail } from "@/lib/utils";
import toast from "react-hot-toast";

const Register = () => {
  const [lastUserSent, setLastUserSent] = useState({ name: "", email: "" });

  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<CreateUserInputType>();

  const mutation = useMutation({
    mutationFn: createUser,
    onError: async (response: any) => {
      setServerError(response.response.data.message);
      toast.error(response.response.data.message);
    },
    onSuccess: async () => {
      setServerError(null);
      toast.success("User Created");
    },
  });

  const { isLoading, isSuccess } = mutation;

  const handleEmailValidation = (email: string) => {
    const isValid = isValidEmail(email);

    return isValid;
  };

  const onSubmit: SubmitHandler<CreateUserInputType> = async (data) => {
    clearErrors();
    reset();
    setLastUserSent(data);
    mutation.mutate(data);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <section>
      <ContentHeader title={"User Registration"} subTitle={"Add New User"} />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-12 w-[600px]">
            <div className="relative">
              <input
                data-testid="test-register-form-name"
                {...register("name", {
                  required: true,
                })}
                className={`bg-slate-100 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
                  errors.name && "border-red-500"
                }`}
                placeholder="Name"
              />
              <label
                className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
                  errors.name && "!text-red-500"
                }`}
              >
                Name
              </label>
              {errors.name && (
                <>
                  <p className="text-red-500">Name is required</p>
                </>
              )}
            </div>
            <div className="relative">
              <input
                data-testid="test-register-form-email"
                {...register("email", {
                  required: true,
                  validate: handleEmailValidation,
                })}
                className={`bg-slate-100 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
                  errors.email && "border-red-500"
                }`}
                placeholder="Email Address"
              />
              <label
                className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
                  errors.email && "!text-red-500"
                }`}
              >
                Email Address
              </label>
              {errors.email && (
                <>
                  <p className="text-red-500">Email is invalid</p>
                </>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="basis-1/2">
                {isSuccess && (
                  <p className="text-green-500">{`User ${lastUserSent.name} created`}</p>
                )}
                {serverError && <p className="text-red-500 ">{serverError}</p>}
              </div>
              <button
                data-testid="test-register-form-submit"
                type="submit"
                className={`bg-blue-500 text-white rounded-md p-2 w-64 ${
                  (errors.email || errors.name) && "text-gray-100 bg-gray-400"
                }`}
                disabled={Boolean(errors.email || errors.name)}
              >
                Submit User
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
