import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../../../components/Tables/TableThree';
import {getPosts} from '../../../../services/post';
import {getTranslations} from 'next-intl/server';
import Link from 'next/link';


export default async function Posts() {
  const t = await getTranslations('Post');
  try {
    const posts = await getPosts();
    // const posts = await getPosts(lang);

    if (!posts || !posts.data) {
      throw new Error('No data received');
    }

    return (
      <DefaultLayout >
        <div className="mx-auto max-w-242.5">
          <Breadcrumb pageName={t('title')} />
          <Link
            href="/admin/posts/add"
            className="bg-orange-200 px-4 pt-2 my-2 text-white"
          >
            Add New Post
          </Link>
          <TableThree posts={posts} />
        </div>
      </DefaultLayout>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="text-center">
        <p className="text-red-500">
          Error fetching posts. Please try again later.
        </p>
      </div>
    );
  }
}
