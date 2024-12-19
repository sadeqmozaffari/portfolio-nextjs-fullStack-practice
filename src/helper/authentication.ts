import * as jose from 'jose';
import {NextRequest} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || ''),
  expireDate: '1d',
  algo: {alg: 'HS256' as const},
};

// تولید JWT
export const encodeToken = async (userId: number): Promise<string> => {
  return await new jose.SignJWT({id: userId})
    .setExpirationTime(jwtConfig.expireDate)
    .setProtectedHeader(jwtConfig.algo)
    .sign(jwtConfig.secret);
};

// رمزگشایی JWT
export const decodeToken = async (
  token: string
): Promise<{id: number} | null> => {
  try {
    const {payload} = await jose.jwtVerify(token, jwtConfig.secret);
    return payload as {id: number};
  } catch (error) {
    console.error('JWT Decode Error:', error);
    return null;
  }
};

// بررسی احراز هویت
export const isAuthenticated = async (
  req: NextRequest
): Promise<{status: boolean; message: string; userId?: number}> => {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return {status: false, message: 'Authorization required'};
  }

  const decodedToken = await decodeToken(token);
  if (!decodedToken) {
    return {status: false, message: 'Invalid or expired token'};
  }

  return {
    status: true,
    message: 'Authorization success',
    userId: decodedToken.id,
  };
};

// دریافت شناسه کاربر از توکن
export const getUserID = async (token?: string): Promise<number | null> => {
  if (!token) return null;
  const data = await decodeToken(token);
  return data?.id || null;
};

// دریافت اطلاعات کاربر
export const getUserInfo = async (req: NextRequest) => {
  const authStatus = await isAuthenticated(req);
  if (!authStatus.status) {
    return {status: false, message: authStatus.message};
  }

  try {
    const user = await prisma.user.findUnique({
      where: {id: authStatus.userId},
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    if (!user) {
      return {status: false, message: 'User not found'};
    }

    return {status: true, user};
  } catch (error) {
    console.error('Prisma Error:', error);
    return {status: false, message: 'Error fetching user info'};
  }
};
