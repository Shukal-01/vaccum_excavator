"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Mail, Building2, User } from "lucide-react";

export default function SupplierSignup() {
  return (
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input id="name" required className="border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-gray-700 flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 text-primary" />
                Company Name
              </Label>
              <Input id="company" required className="border-gray-300" />
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
              />
            </div>
            <Button className="w-full" type="submit">
              Create Account
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" type="button">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
