import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import {encodeToken} from '../../../../helper/authentication';
interface ILoginBody {
  email: string;
  password: string;
}
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const body: ILoginBody = await req.json();
    const {password, email} = body;
    if (!email || !password) {
      return NextResponse.json(
        {message: 'Missing required fields'},
        {status: 400}
      );
    }

    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!userExist) {
      return NextResponse.json({message: 'User Not Found'}, {status: 404});
    } else {
      const valid = await bcrypt.compareSync(password, userExist?.password);
      if (!valid) {
        return NextResponse.json({message: 'Invalid Password'}, {status: 400});
      }
    
      const token = await encodeToken(userExist.id);

      const response = NextResponse.json(
        {message: 'user login successfully'},
        {status: 201}
      );
      response.cookies.set({
        name: 'token', // نام کوکی
        value: token, // مقدار توکن
        httpOnly: true, // امنیتی (دسترسی از کلاینت غیرفعال)
        path: '/', // مسیر
        maxAge: 60 * 60 * 5, // 5 ساعت به ثانیه
        sameSite: 'strict', // امنیت Cross-Site
      });

      return response;
    }
  } catch (error) {
    console.error('Error Login User', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
