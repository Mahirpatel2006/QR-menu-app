'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/auth/register', { name, email, password });

      if (res.status === 201) {
        setSuccess('Registration successful! Redirecting...');
        await signIn('credentials', { email, password, redirect: false });
        router.push('/auth/signin');
      } else {
        setError(res.data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#f0f4f8] overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="absolute -top-20 -left-20 opacity-20" width="500" height="500" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="250" fill="#ff6f61" />
        </svg>
        <svg className="absolute bottom-0 right-0 opacity-20" width="400" height="400" viewBox="0 0 400 400">
          <rect width="400" height="400" fill="#2c3e50" />
        </svg>
      </div>
      <motion.div 
        className="max-w-lg mx-auto p-10 bg-white rounded-2xl shadow-lg transform transition-transform hover:scale-105 z-10"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-[#2c3e50] text-center mb-8">Create Your Account</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-[#2c3e50] text-lg">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#bdc3c7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-[#2c3e50] text-lg">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#bdc3c7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-[#2c3e50] text-lg">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#bdc3c7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#ff6f61] text-white py-3 rounded-md hover:bg-[#ff8a76] transition"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}