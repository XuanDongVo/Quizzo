import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = [
    "/library",
    "/quizz",
    "/profile",
  ];

  const isProtected = protectedPaths.some(path =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/quizz/:path*",
    "/profile/:path*",
    "/library/:path*",
  ],
};