import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

// متد GET
export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const post = await prisma.post.findFirst({
        where: {id: Number(id)},
      });

      if (!post) {
        return NextResponse.json({error: 'Post not found'}, {status: 404});
      }

      return NextResponse.json(post, {status: 200});
    }

    const posts = await prisma.post.findMany({
      where: {published: true},
    });

    return NextResponse.json(posts, {status: 200});
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

// متد POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {title, content, authorId, published} = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: published || false,
      },
    });

    return NextResponse.json(post, {status: 201});
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

// متد PUT
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {id, title, content, published} = body;

    if (!id || !title || !content) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      );
    }

    const updatedPost = await prisma.post.update({
      where: {id: Number(id)},
      data: {title, content, published},
    });

    return NextResponse.json(updatedPost, {status: 200});
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

// متد DELETE
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const {id} = body;

    if (!id) {
      return NextResponse.json({error: 'ID is required'}, {status: 400});
    }

    const deletedPost = await prisma.post.delete({
      where: {id: Number(id)},
    });

    return NextResponse.json(deletedPost, {status: 200});
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
