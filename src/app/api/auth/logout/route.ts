import {NextResponse} from 'next/server';

export async function POST() {
  try {
    // Clear the authentication token by setting an expired cookie
    const response = NextResponse.json(
      {message: 'Logout successful'},
      {status: 200}
    );

    // Set the token cookie to expire immediately
    response.cookies.set('token', '', {
      path: '/',
      expires: new Date(0), // Expired date
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}
