// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🔥 Middleware running for:", request.nextUrl.pathname);

  // Если уже на странице логина и есть кука - редиректим на главную
  if (request.nextUrl.pathname === "/login") {
    const authCookie = request.cookies.get("is-authenticated");
    if (authCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Для всех остальных защищенных роутов
  const authCookie = request.cookies.get("is-authenticated");
  if (!authCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Важно! Без этого страницы не будут отображаться
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (для твоей апишки аутентификации)
     * - login (страница логина)
     * - _next (системные файлы Next.js)
     * - favicon.ico, images, etc (статические файлы)
     */
    "/((?!api|login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
