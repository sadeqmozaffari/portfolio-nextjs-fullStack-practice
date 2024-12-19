/* eslint-disable @typescript-eslint/no-explicit-any */
import {getPosts} from '../../services/post';
import Link from 'next/link';
export default async function TableThree() {
  try {
    const posts = await getPosts();

    if (!posts || !posts.data) {
      throw new Error('No data received');
    }

    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {/* Add column headers here */}
              </tr>
            </thead>
            <tbody>
              {posts.data.map((packageItem: any, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.title || 'Untitled'}
                    </h5>
                    <p className="text-sm">
                      {packageItem.content || 'No content'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.authorId || 'Unknown'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        packageItem.published
                          ? 'bg-success text-success'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {packageItem.published ? 'Published' : 'Draft'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`/admin/posts/edit?id=${packageItem.id}`}
                        className="hover:text-primary"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/posts/delete?id=${packageItem.id}`}
                        className="hover:text-primary"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="text-center">
        <p className="text-red-500">Error</p>
      </div>
    );
  }
}
