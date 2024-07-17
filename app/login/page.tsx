'use client';
import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from "next/link";

import { invoke } from '@tauri-apps/api/tauri'
import { trace, info, error, attachConsole } from '@tauri-apps/plugin-log';

async function log(){
  if (typeof window !== "undefined") {
    // 安全地使用 @tauri-apps/api 或其他依赖于 window 的代码
    const detach = await attachConsole();
    trace('Trace');
    info('Info');
    error('Error');
    detach();
}

}
export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // detach the browser console from the log stream
    
    log();


    let payload = {value:"test"};

  useEffect(() => {
    invoke('ping',{payload}).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error)
      });
  }, []);

    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // 在这里添加你的登录逻辑，例如调用 API 进行身份验证
    // 这个示例中，我们将假设登录成功后重定向到主页
    if (email === 'test@example.com' && password === 'password') {
        console.log("test")
    } else {
        alert('Invalid credentials');
    }
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
        <Link href="/">
          首页
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login to Your Account</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={log}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

