import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
interface IRegisterBody {
  email: string;
  password: string;
  name: string;
  phone?: string;
}
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const body: IRegisterBody = await req.json();
    const {name, phone, password, email} = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        {message: 'Missing required fields'},
        {status: 400}
      );
    }
    const userDuplicate = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userDuplicate)
      return NextResponse.json({message: 'user already exists'}, {status: 400});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    return NextResponse.json(
      {message: 'user created successfully', user},
      {status: 201}
    );
  } catch (error) {
    console.error('Error Register User', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
