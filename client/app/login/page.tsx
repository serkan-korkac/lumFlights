'use client'

import axiosInstance from '@/lib/api';
import { FormEvent, useState } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

interface LoginResponse {
  data: {
    accessToken: string;
  }
}
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/auth/login', { username, password }).then((res: LoginResponse) => {
      const data = res.data;
      Cookies.set('token', data.accessToken);
      router.push('/dashboard');

    }).catch(() => {
      alert('Login failed');
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-400 mb-8">Login to your LumFlights account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">User name</label>
            <input
              id="username"
              className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              name='username'
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>

      {/* Background Icons */}
      <div className="absolute top-10 left-10 animate-pulse">
        <img src="/images/logo.png" alt="Login Icon" className="w-20 h-20" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse">
        <img src="/images/secure.png" alt="Secure Icon" className="w-20 h-20" />
      </div>
    </div>
  );
}