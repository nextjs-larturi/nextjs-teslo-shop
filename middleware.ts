/* eslint-disable @next/next/no-server-import-in-page */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwt } from './utils';

export async function middleware(req: NextRequest) {

   const token = req.cookies.get('token') || '';

    if (req.nextUrl.pathname.startsWith('/checkout')) {

        if(token.length > 10) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/auth/login?p=/checkout/address', req.url))
        }

    }

}
