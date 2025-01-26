
import axiosInstance from '@/lib/api';
import { NextResponse } from 'next/server';

export async function middleware(request: Request) {
  try {
    const profile = await axiosInstance.post('/auth/profile');
    console.log('Profile:', profile.data);
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
    matcher: '/dashboard/:path*',
  }
