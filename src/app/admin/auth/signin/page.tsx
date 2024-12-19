'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-toastify';
import {useRouter} from 'next/navigation';
import {login} from '../../../../services/auth';
import {getUserInfo} from '../../../../services/user';
import {useUserStore} from '../../../../store';

const SignIn: React.FC = () => {
  const router = useRouter();
  const {setUser} = useUserStore();
  const [form, setForm] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      toast.success('Login Successfully');
      const {data} = await getUserInfo();
      setUser(data.data);
      router.replace('/admin');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center mx-auto my-auto">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <form className="p-8" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-center">Sign In</h2>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleFormChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
