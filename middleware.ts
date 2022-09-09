/* eslint-disable @next/next/no-server-import-in-page */

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {

    const cookie = req.headers.get('cookie');
    const session: any = await getSession({ req: { headers: {cookie} } as any});
    const url = req.nextUrl.clone();

    // console.log(session.user.role);
    // console.log(req.nextUrl.pathname);

    if (
        req.nextUrl.pathname.startsWith('/admin') ||
        req.nextUrl.pathname.startsWith('/admin/users')
    ) {
        if(!session) {
            const requestedPage = req.nextUrl.pathname;
            return NextResponse.redirect(`${url.origin}/auth/login?prev=${requestedPage}`);
        } 

        const validRoles = ['admin'];

        if(!validRoles.includes(session.user.role)){
            return NextResponse.redirect(`${url.origin}/auth/login?`);
        }
    }

    if (
        req.nextUrl.pathname.startsWith('/api/admin/dashboard') ||
        req.nextUrl.pathname.startsWith('/api/admin/users')
    ) {
        if(!session){
            const requestedPage = req.nextUrl.pathname;
            return NextResponse.redirect(`${url.origin}/auth/login?prev=${requestedPage}`);
        }
    }

    if (req.nextUrl.pathname.startsWith('/checkout/address')) {
        if(!session) {
            const requestedPage = req.nextUrl.pathname;
            return NextResponse.redirect(`${url.origin}/auth/login?prev=${requestedPage}`);
        } 

        const validRoles = ['admin'];

        if(!validRoles.includes(session.user.role)){
            return NextResponse.redirect(`${url.origin}/auth/login?`);
        }
    }
    
    return NextResponse.next();    

}

export const config = {
    matcher: [
        '/admin', 
        '/admin/users', 
        '/api/admin/dashboard',
        '/api/admin/users',
    ],
}