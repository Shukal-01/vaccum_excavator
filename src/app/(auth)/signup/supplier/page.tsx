"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Mail, Building2, User } from 'lucide-react';
// import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function SupplierSignup() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/supplier/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName, companyName: companyName, email: email, password: password }),
      });

      const data = await response.json();
      console.log(data, "data")

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Show success toast
      toast.success("Supplier account created successfully!");

      // Redirect to dashboard or home page after successful signup
      // router.push("/dashboard");
    } catch (err) {
      // Show error toast
      toast.error(err instanceof Error ? err.message : "An error occurred");
      setError(err instanceof Error ? err.message : "An error occurred");
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
              <Truck className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Join as a Supplier
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Start renting out your equipment today
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
                  htmlFor="company"
                  className="text-gray-700 flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4 text-primary" />
                  Company Name
                </Label>
                <Input
                  id="company"
                  required
                  className="border-gray-300"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  htmlFor="email"
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
