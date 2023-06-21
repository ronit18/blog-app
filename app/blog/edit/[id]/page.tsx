'use client';

import { useRouter } from 'next/navigation';
import React, { use, useEffect, useRef } from 'react';
import { Toaster, Toast, toast } from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';

const getBlogById = async (id: string) => {
	toast.loading('Fetching Blog...⌛ ', { id: '1' });

	try {
		const res = await fetch(`http://localhost:3000/api/blog/${id}`);
		const data = await res.json();

		if (data.error) {
			toast.error(data.error, { id: '1' });
			return;
		}

		toast.success('Blog Fetched Successfully 👍 ', { id: '1' });

		return data.post;
	} catch (err: any) {
		console.log('Error in getBlogById(app/blog/edit/[id]/page.tsx): ', err);
		toast.error('Error in getting blog ❌ ', { id: '1' });
		return;
	}
};

const postBlog = async (title: string, description: string, id: string) => {
	toast.loading('Posting the updated Blog...⌛ ', { id: '1' });
	try {
		const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title, description }),
			//@ts-ignore
			'content-type': 'application/json',
		});
		const data = await res.json();

		if (data.error) {
			toast.error(data.error, { id: '1' });
			return;
		}

		toast.success('Blog Updated Successfully 👍 ', { id: '1' });
		return data;
	} catch (err: any) {
		console.log('Error in postBlog(app/blog/add/page.tsx): ', err);
		toast.error('Error in posting blog ❌ ', { id: '1' });
		return;
	}
};

const EditBlog = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		getBlogById(params.id)
			.then((data) => {
				titleRef.current!.value = data.title;
				descriptionRef.current!.value = data.description;
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error in getting blog ❌ ', { id: '1' });
			});
	}, [params.id]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await postBlog(
			titleRef.current!.value,
			descriptionRef.current!.value,
			params.id
		);
	};

	return (
		<>
			<Toaster />
			<button onClick={() => router.back()}>
				<div className="text-white flex flex-row relative top-5 mr-2">
					<BiArrowBack size={29} />
					<p>Go back</p>
				</div>
			</button>
			<div className="w-full m-auto flex my-4">
				<div className="flex flex-col justify-center items-center m-auto">
					<p className="text-2xl text-slate-200 font-bold p-3">
						Edit Blog 🌟{' '}
					</p>

					<form
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleSubmit(e);
							}
						}}
						onSubmit={handleSubmit}
					>
						<label
							htmlFor="title"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter Title
						</label>
						<input
							ref={titleRef}
							type="text"
							id="first_name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="My First Blog"
						/>

						<label
							htmlFor="description"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-4"
						>
							Enter description
						</label>
						<textarea
							ref={descriptionRef}
							id="message"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pb-8"
							placeholder="Write your thoughts here..."
						></textarea>
						<br />
						<div className="flex justify-center">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EditBlog;
