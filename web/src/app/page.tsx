"use client";

import { Input, Button, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Variant = "LOGIN" | "REGISTER";
type FormData = {
  name: string;
  email: string;
  password: string;
};

const Home = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const session = useSession();

  const toggleVariant = () => {
    setFormData({ name: "", email: "", password: "" });
    console.log(formData);
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/home");
    }
  }, [session.status, router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      await axios
        .post("/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        .then(() =>
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          })
        )
        .then((response) => {
          if (response?.error) {
            toast.error("The email or password is incorrect");
          }

          if (response?.ok && !response?.error) {
            toast.success("The user has been registered successfully");
            setVariant("LOGIN");
          }
        })
        .catch((error) => {
          toast.error("There is already an account with this email");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            console.log(response);
            toast.error("The email or password is incorrect");
          }

          if (response?.ok && !response?.error) {
            toast.success("Logged in successfully");
            router.push("/home");
          }
        })
        .catch((error) => {
          console.error("Failed to login with credentials: " + error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const providerButtons = (provider: "google" | "github") => {
    setIsLoading(true);

    signIn(provider, { redirect: false })
      .then((response) => {
        if (response?.error) {
          toast.error("Failed to login with provider");
        }
        if (response?.ok && !response?.error) {
          toast.success("Logged in successfully");
          router.push("/home");
        }
      })
      .catch((error) => {
        console.error("Failed to login with provider: " + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-gray-900">
          {variant == "LOGIN" ? "Sign in to your account" : "Create an account"}
        </h2>
        <div className="bg-white px-4 py-8 shadow-2xl sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {variant == "REGISTER" && (
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            )}
            <Input
              label="Email"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <Input
              label="Password"
              endContent={
                <button
                  className="flex justify-center items-center h-full"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isPasswordVisible ? (
                    <FaEye size={20} className="text-default-900" />
                  ) : (
                    <FaEyeSlash size={20} className="text-default-700" />
                  )}
                </button>
              }
              type={isPasswordVisible ? "text" : "password"}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />

            <div className="flex items-center justify-between">
              <Checkbox defaultSelected>Remember me</Checkbox>
              <Link href="/forgot-password">
                <button className="text-sm font-semibold text-[#0070e0] hover:underline">
                  Forgot password?
                </button>
              </Link>
            </div>
            <div>
              <Button
                fullWidth
                isLoading={isLoading}
                variant="solid"
                className="bg-[#0544b5] text-white font-semibold hover:bg-[#0070e0]"
                onClick={() => onSubmit(formData)}
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 " />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <Button
              fullWidth
              className="bg-gray-100"
              onClick={() => providerButtons("google")}
            >
              <FcGoogle size={30} />
            </Button>
            <Button
              fullWidth
              className="bg-gray-100"
              onClick={() => providerButtons("github")}
            >
              <FaGithub size={30} />
            </Button>
          </div>
        </div>
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={toggleVariant}
              className="ml-1 font-medium text-blue-500 hover:underline"
            >
              {variant === "LOGIN" ? "Register" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
