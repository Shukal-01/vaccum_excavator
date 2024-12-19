import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2070&q=80 "
            alt="Construction site"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="text-lg font-semibold text-white">
                Vac Ex Dispatch
              </span>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-white hover:text-primary hover:bg-white/10"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center pt-32 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Efficient Excavator Hiring
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with verified excavator suppliers for your projects. Fast,
              simple, and reliable.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Why Choose Vac Ex Dispatch?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="border-none shadow-none">
              <CardContent className="pt-6 text-center">
                <div className="mb-6 flex justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Smart Matching
                </h3>
                <p className="text-gray-600">
                  Find the perfect equipment based on your specific requirements
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none">
              <CardContent className="pt-6 text-center">
                <div className="mb-6 flex justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Urgent Response
                </h3>
                <p className="text-gray-600">
                  Quick booking process for time-critical projects
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none">
              <CardContent className="pt-6 text-center">
                <div className="mb-6 flex justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Verified Partners
                </h3>
                <p className="text-gray-600">
                  All equipment providers are thoroughly vetted for quality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
