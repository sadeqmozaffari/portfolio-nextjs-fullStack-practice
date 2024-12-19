import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {decodeToken} from '@/helper/authentication';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Get token from cookies
    const cookies = req.headers.get('cookie');
    const token = cookies
      ?.split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json(
        {message: 'Authorization required'},
        {status: 401}
      );
    }

    // Decode the token
    const decodedToken = await decodeToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        {message: 'Invalid or expired token'},
        {status: 401}
      );
    }

    // Fetch user data
    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    if (!user) {
      return NextResponse.json({message: 'User not found'}, {status: 404});
    }

    return NextResponse.json({data: user});
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}
