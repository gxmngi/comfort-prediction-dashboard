// middleware.js
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
