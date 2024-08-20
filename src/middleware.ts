import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let hasCookie = request.cookies.has("token-client");

  const response = NextResponse.next();

  if (
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/no-available"
  ) {
    return response;
  }


  const responseModalIdentityPuddyWebsite = (visual: string) => {
    if(visual === 'identity') {
      return true;
    }else{
      return false;
    }
  }

  if (!hasCookie) {
    if (
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/register" &&
      request.nextUrl.pathname !== "/recover"
    ) {
      const queryParams = request.nextUrl.search;
      return NextResponse.redirect(
        request.nextUrl.origin + "/login" + queryParams
      );
    }
  } else {
    if (request.nextUrl.pathname === "/") {
      const queryParams = request.nextUrl.search;
      return NextResponse.redirect(
        request.nextUrl.origin + "/home" + queryParams
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|icons|images|locales|manifest.json|sw.js|logo1024.png|scripts|styles).*)",
  ],
};
