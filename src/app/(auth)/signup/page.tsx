import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Truck, ArrowRight } from "lucide-react";

export default function SignupRole() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            Choose Your Path
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Whether you&rsquo;re looking to supply equipment or find the perfect tool
            for your project, we&lsquo;ve got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10">
            OR
          </div>
          <Card className="border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl">
                <Truck className="h-8 w-8 text-primary" />
                Supplier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Rent out your excavation equipment and earn money
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> List your
                  equipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Set your own
                  rates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Manage
                  bookings
                </li>
              </ul>
              <Button asChild className="w-full group">
                <Link
                  href="/signup/supplier"
                  className="flex items-center justify-center"
                >
                  Continue as Supplier
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800 text-2xl">
                <HardHat className="h-8 w-8 text-primary" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Hire excavation equipment for your projects
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Find
                  equipment nearby
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Compare
                  prices
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span> Book
                  instantly
                </li>
              </ul>
              <Button asChild className="w-full group">
                <Link
                  href="/signup/customer"
                  className="flex items-center justify-center"
                >
                  Continue as Customer
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
