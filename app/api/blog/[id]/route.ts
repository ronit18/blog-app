import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { main } from '../route';

export const GET = async (req: Request, res: NextResponse) => {
	const id = req.url?.split('/')[5];
	try {
		await main();
		const post = await prisma.post.findFirst({
			where: {
				id,
			},
		});

		if (!post) {
			return NextResponse.json(
				{ message: 'Post not found.' },
				{ status: 404 }
			);
		}

		console.log(`GET /api/blog/[${id}]/route.ts:`, post);

		return NextResponse.json(
			{ message: `Fetched the post Successfully: ${id}`, post },
			{ status: 200 }
		);
	} catch (err: any) {
		console.log(`Error in GET /api/blog/[${id}]/route.ts:`, err);
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};

export const PUT = async (req: Request, res: NextResponse) => {
	const id = req.url?.split('/')[5];
	try {
		await main();
		const { title, description } = await req.json();
		const post = await prisma.post.update({
			where: {
				id,
			},
			data: {
				title,
				description,
			},
		});

		if (!post) {
			return NextResponse.json(
				{ message: 'Post not found.' },
				{ status: 404 }
			);
		}

		console.log(`PUT /api/blog/[${id}]/route.ts:`, post);

		return NextResponse.json(
			{ message: `Updated the post Successfully: ${id}`, post },
			{ status: 200 }
		);
	} catch (err: any) {
		console.log(`Error in PUT /api/blog/[${id}]/route.ts:`, err);
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
