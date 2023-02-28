import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/auth") && !pathname.includes("newuser")) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth/newuser")) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    if (token.isVerified) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const url = req.nextUrl.clone();
    if (!token) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    if (!token.isVerified) {
      url.pathname = "/auth/newuser";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname == "/") {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const url = req.nextUrl.clone();
    if (!token) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }

    if (token.isVerified) {
      url.pathname = "/auth/newuser";
      return NextResponse.redirect(url);
    }

    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/"],
};
