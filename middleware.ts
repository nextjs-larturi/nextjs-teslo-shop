/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { IUser } from './interfaces';
 
export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const validRoles = ['admin','superuser'];

    const user: IUser = session.user as IUser;

    if ( !validRoles.includes(user.role) ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }
  }
 
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/checkout/address', 
    '/checkout/summary', 
    '/admin', 
    '/admin/orders', 
    '/admin/products'
  ]
};
