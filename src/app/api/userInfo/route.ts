import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token)
    return NextResponse.json(
      {message: 'Authorization Required'},
      {
        status: 401,
      }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken: any = jwt.verify(token, 'my secret');

  const userId = decodedToken.id;
  const email = decodedToken.email;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {error: 'User Not Found'},
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({data: user}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: 'Internal Server Error'},
      {
        status: 500,
      }
    );
  }
}
