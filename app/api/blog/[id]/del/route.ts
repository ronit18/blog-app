import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { main } from '../../route';

export const GET = async (req: Request, res: NextResponse) => {
	const id = req.url?.split('/')[5];

	try {
		await main();
		const post = await prisma.post.delete({
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

		console.log(`GET /api/blog/[${id}]/del/route.ts:`, post);

		return NextResponse.json(
			{ message: `Successfully Deleted the post: ${id}`, post },
			{ status: 200 }
		);
	} catch (err: any) {
		console.log(`Error in GET /api/blog/[${id}]/del/route.ts:`, err);
		return NextResponse.json(
			{ error: 'Internal Server Error.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
