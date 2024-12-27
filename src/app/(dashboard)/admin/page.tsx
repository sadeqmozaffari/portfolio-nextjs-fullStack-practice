import ECommerce from '@/components/Dashboard/E-commerce';
import {Metadata} from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export const metadata: Metadata = {
  title:
    'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({params}: any) {
  return (
    <>
      <DefaultLayout params={params}>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
