"use client";

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setTranscript(data.transcript);
      }
    } catch (error) {
      console.error('Hata:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070910] text-[#f7f8f8] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">YouTube Video Transkripti</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="YouTube video URL'sini yapıştırın"
            className="w-full p-4 rounded bg-transparent border border-[#2a3f5f] text-[#f7f8f8] placeholder-[#94a3b8] focus:outline-none focus:border-[#d45a07]"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d45a07] text-white py-4 rounded hover:bg-[#c04d06] transition-colors disabled:opacity-50"
          >
            {loading ? 'İşleniyor...' : 'ÖZETLE'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-8 w-full max-w-2xl p-4 border border-red-500 rounded bg-red-500/10 text-red-500">
          {error}
        </div>
      )}

      {transcript && (
        <div className="mt-8 w-full max-w-2xl p-4 border border-[#2a3f5f] rounded">
          <h2 className="text-xl font-semibold mb-4">Transkript:</h2>
          <p className="text-[#94a3b8] whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  );
}
