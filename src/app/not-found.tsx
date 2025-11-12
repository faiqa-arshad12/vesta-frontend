import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Home, ArrowLeft} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="h-1 w-24 bg-primary mx-auto"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-sm text-muted-foreground">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
            size="lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Go to Homepage</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
            size="lg"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

