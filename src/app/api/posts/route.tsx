import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// متد GET
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, {status: 200});
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
