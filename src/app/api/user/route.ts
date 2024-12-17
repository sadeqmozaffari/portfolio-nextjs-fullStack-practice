import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({error: 'ID is required'}), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return new Response(JSON.stringify({error: 'User not found'}), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const {email, name, password, phone} = body;

  if (!name || !password || !phone || !email) {
    return new Response(JSON.stringify({error: 'All fields are required'}), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password,
        phone,
        email,
      },
    });

    return new Response(JSON.stringify(user), {status: 201});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const {id, email, name, password, phone} = body;

  if (!id || !email || !name || !password || !phone) {
    return new Response(JSON.stringify({error: 'All fields are required'}), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
        password,
        phone,
      },
    });

    return new Response(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const {id} = body;

  if (!id) {
    return new Response(JSON.stringify({error: 'ID is required'}), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return new Response(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
    });
  }
}
