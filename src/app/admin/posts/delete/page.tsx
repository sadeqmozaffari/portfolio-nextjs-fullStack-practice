'use client';
import React, {useEffect, useState} from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import {toast} from 'react-toastify';
import {getPostById, deletePost} from '../../../../services/post';
import {useRouter, useSearchParams} from 'next/navigation';

const DeletePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    title: '',
    content: '',
    authorId: 1,
    published: false,
  });

  useEffect(() => {
    if (id) {
      getPostById(Number(id))
        .then((response) => {
          setForm(response.data); // تنظیم جزئیات پست
        })
        .catch(() => {
          toast.error('Failed to fetch post details');
        });
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      deletePost(Number(id))
        .then(() => {
          toast.success('Post deleted successfully');
          router.push('/admin/posts'); // انتقال به لیست پست‌ها
        })
        .catch(() => {
          toast.error('Failed to delete the post');
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Delete Post" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center my-auto mx-auto">
            <div className="w-full border-stroke dark:border-strokedark border-l-2">
              <div className="w-full p-4">
                <h3 className="text-center text-black dark:text-white mb-6">
                  Are you sure you want to delete this post?
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-medium text-black dark:text-white">
                    <strong>Title:</strong> {form.title}
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white">
                    <strong>Content:</strong> {form.content}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleDelete}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Delete Post
                  </button>
                  <button
                    onClick={() => router.push('/admin/posts')}
                    className="w-full text-center cursor-pointer rounded-lg border border-red-500 bg-red-500 p-4 text-white transition hover:bg-opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DeletePost;
