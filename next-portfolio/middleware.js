import { NextResponse } from 'next/server';

export function middleware(request) {
	const isProfileRoute = request.nextUrl.pathname.startsWith('/profile');
	const cookies = request.cookies.getAll();
	const supabaseAuthCookie = cookies.find(
		(cookie) => cookie.name.includes('sb-') && cookie.name.includes('auth-token')
	);
	const hasSupabaseAuthCookie =
		typeof supabaseAuthCookie?.value === 'string' && supabaseAuthCookie.value.length > 0;

	if (isProfileRoute && !hasSupabaseAuthCookie) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile/:path*'],
};
