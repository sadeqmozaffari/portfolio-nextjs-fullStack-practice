import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../../components/Tables/TableThree';
import Link from 'next/link';

const Posts = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Posts" />
        <Link
          href="/admin/posts/add"
          className="bg-orange-200 px-4 pt-2 my-2   text-white "
        >
          Add New Post
        </Link>
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Posts;
