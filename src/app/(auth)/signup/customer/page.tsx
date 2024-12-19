'use client';
import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { HardHat, User, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CustomerSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName, email: email, password: password }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text(); // Capture the raw response
        console.error("Raw response error:", errorText);
        throw new Error("Failed to create account. Check server logs for details.");
      }

      const data = await response.json();
      console.log("User created successfully:", data);
      toast.success("Account created successfully. Please login to continue.");
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-primary shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-white w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <HardHat className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Join as a Customer
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Find the perfect equipment for your project
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-700 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  required
                  className="border-gray-300"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-700 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}