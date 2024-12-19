'use client';
import React, {useEffect, useState} from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import {toast} from 'react-toastify';
import {updatePost, getPostById} from '../../../../services/post';
import {useRouter, useSearchParams} from 'next/navigation';

const EditPost = () => {
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
          setForm(response.data);
        })
        .catch(() => {
          toast.error('Failed to fetch post details');
        });
    }
  }, [id]); // وابستگی به id

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost(form)
      .then(() => {
        toast.success('Edit Successfully');
        router.push('/admin/posts'); // انتقال به لیست پست‌ها
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || 'An Error Occurred');
      });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Edit Post" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center my-auto mx-auto">
            <div className="w-full border-stroke dark:border-strokedark border-l-2">
              <div className="w-full p-4">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title} // مقدار از state
                      onChange={handleFormChange}
                      name="title"
                      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Content
                    </label>
                    <input
                      type="text"
                      value={form.content} // مقدار از state
                      onChange={handleFormChange}
                      name="content"
                      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>

                  <div className="my-5">
                    <input
                      type="submit"
                      value="Update Post"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditPost;
