"use client";
import React from 'react';
import { useState } from 'react';

export default function page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/mentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, bio }),
    });

    if (res.ok) {
      alert('Mentor added successfully!');
      setName('');
      setEmail('');
      setBio('');
    } else {
      alert('Failed to add mentor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Add Mentor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border px-4 py-2 rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Mentor
        </button>
      </form>
    </div>
  );
}
