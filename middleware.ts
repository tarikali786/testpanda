import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session   = req.cookies.get("session")?.value;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !session) {
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
