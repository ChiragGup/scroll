import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith("/api/auth") || // next-auth routes
          pathname === "/login" ||            // allow login page
          pathname === "/register" ||         // allow register page
          pathname === "/" ||                 // allow homepage
          pathname.startsWith("/api/video")   // ✅ allow /api/video
        ) {
          return true;
        }

        // 🔒 Everything else requires auth
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
