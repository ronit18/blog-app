import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function main() {
	try {
		await prisma.$connect();
	} catch (err: any) {
		console.log('Error in /api/blog/route.ts:', err);
	}
}

export const GET = async (req: Request, res: NextResponse) => {
	try {
		await main();
		const post = await prisma.post.findMany();
		console.log('GET /api/blog/route.ts:', post);
		return NextResponse.json({ message: 'success', post }, { status: 200 });
	} catch (err: any) {
		console.log('Error in GET /api/blog/route.ts:', err);
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (req: Request, res: NextResponse) => {
	try {
		await main();
		const { title, description } = await req.json();
		const post = await prisma.post.create({
			data: {
				title,
				description,
			},
		});
		console.log('POST /api/blog/route.ts:', post);
		return NextResponse.json({ message: 'success', post }, { status: 201 });
	} catch (err: any) {
		console.log('Error in POST /api/blog/route.ts:', err);
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
