/* eslint-disable @next/next/no-server-import-in-page */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/checkout/address')) {

        const token = await getToken({
            req: req,
            secret:  process.env.NEXTAUTH_SECRET,
            raw: true,
          });

        // console.log(token)

        if(!token) {
            return NextResponse.redirect(new URL('/auth/login?p=/checkout/address', req.url))
        } 
        return NextResponse.next();
    }

}
