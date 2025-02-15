"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuthStore from "@/store/authstores";
import { ArrowRight, KeyRound, Mail } from "lucide-react";
import Image from "next/image";
import ErrorDialog from "@/components/custom/errorDialog";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const login = useAuthStore((state: { login: any }) => state.login);
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login({
        email: email,
        password: password,
      });
      console.log("Result: ", result.statusCode);
      if (result.statusCode === 200) {
        setIsLoading(false);
        router.push("/admin");
      } else {
        setErrorMessage(result.error);
        setDialogOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <Image
                src="/images/PH.png"
                alt="PH Logo"
                width={30}
                height={30}
                className="w-20 h-8"
              />
            </div>

            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-600 mb-8">
              Please enter your details to sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#27264E] hover:bg-[#1f1e3d] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
            {/* Error dialog */}
            <ErrorDialog
              isOpen={isDialogOpen}
              onOpenChange={handleOpenChange}
              title="Oops! Error Occurred"
              description={errorMessage} // Display dynamic error message
            />
          </motion.div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#27264E]/90 to-[#27264E]/70 mix-blend-multiply" />
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
          alt="Office"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Manage Your Events with Confidence
              </h2>
              <p className="text-lg text-gray-200">
                Access your dashboard to create and manage events, track ticket
                sales, and engage with your audience all in one place.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
