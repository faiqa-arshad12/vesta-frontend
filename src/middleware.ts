import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";

export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth?.user;

  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuth = nextUrl.pathname.startsWith("/signin") || nextUrl.pathname.startsWith("/signup");

  // Protect dashboard routes - redirect to signin if not authenticated
  if (isOnDashboard && !isLoggedIn) {
    const signInUrl = new URL("/signin", nextUrl);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isOnAuth && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};

