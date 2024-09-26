import {NextResponse} from "next/server";

import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("TOKEN");

	// Handle router handler request (with path /api)
	if (request.nextUrl.pathname.match("/api")) {
		// API request middleware goes here
	} else {
		// Redirect to login page if token does not exist
		if (!token?.value && request.nextUrl.pathname !== "/login") {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		// Redirect to root page if token is exist
		if (request.nextUrl.pathname === "/login" && token?.value) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		// Rewrite the root page to /application
		if (request.nextUrl.pathname === "/") {
			return NextResponse.redirect(new URL("/application", request.url));
		}
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
