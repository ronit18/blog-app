import Link from 'next/link';
import { IPost } from './Types/types';

async function FetchBlogs() {
	const res = await fetch('http://localhost:3000/api/blog', {
		next: {
			revalidate: 10,
		},
	});
	const data = await res.json();
	return data.post;
}

const Home = async () => {
	const post = await FetchBlogs();
	return (
		<main className="w-full h-full">
			<div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
				<h1 className="text-slate-200 text-center text-2xl font-extralight font-[vardana]">
					My Full Stack Blog app
				</h1>
			</div>
			<div className="flex my-5">
				<Link
					href="/blog/add"
					className="md:w-1/6 sm:w-2/4 rounded-md text-center p-2 font-semibold m-auto pb-2 bg-slate-200"
				>
					Add new blog🚀
				</Link>
			</div>

			<div className="w-full flex flex-col justify-center items-center">
				{post?.map((posts: IPost) => (
					<div
						className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center"
						key={posts.id}
					>
						<div className="flex items-center ">
							<div className="mr-auto">
								<h2 className="mr-auto font-semibold">
									{posts.title}
								</h2>
							</div>
							<Link
								className="px-4 py-1 bg-slate-900 rounded-md font-semibold  text-slate-200"
								href={`/blog/edit/${posts.id}`}
							>
								Edit
							</Link>
						</div>

						<div className="mr-auto my-1">
							<h2 className="text-slate-700 font-bold">
								{posts.description}
							</h2>
						</div>
						<div className="mr-auto my-1">
							<blockquote className="font-semibold text-xs text-slate-700">
								{new Date(posts.date).toDateString()}
							</blockquote>
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Home;
