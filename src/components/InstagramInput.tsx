import React, { useState } from 'react';
import { Instagram, AlertCircle } from 'lucide-react';
import { fetchInstagramComments, extractPostId } from '../utils/instagram';

interface InstagramInputProps {
  onFetchComments: (comments: string[]) => void;
  isLoading: boolean;
}

export default function InstagramInput({ onFetchComments, isLoading }: InstagramInputProps) {
  const [postUrl, setPostUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string): boolean => {
    return !!extractPostId(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateUrl(postUrl)) {
      setError('Please enter a valid Instagram post URL');
      return;
    }

    try {
      // For development/demo purposes, use mock data
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          const mockComments = [
            "user1", "user2", "user3", "Meriem Bouabdallah",
            "commenter1", "commenter2", "instagram_user"
          ];
          onFetchComments(mockComments);
        }, 1500);
        return;
      }

      // In production, use the actual API
      const comments = await fetchInstagramComments(postUrl);
      onFetchComments(comments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch comments';
      setError(errorMessage);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Fetch Instagram Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postUrl" className="block text-sm font-medium mb-2">
            Instagram Post URL
          </label>
          <input
            type="url"
            id="postUrl"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            isLoading
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Instagram className="w-5 h-5" />
          <span>{isLoading ? 'Fetching...' : 'Fetch Comments'}</span>
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-400">
        <p>Supported URL formats:</p>
        <ul className="list-disc list-inside ml-4">
          <li>https://www.instagram.com/p/ABC123xyz/</li>
          <li>https://www.instagram.com/reel/ABC123xyz/</li>
        </ul>
      </div>
    </div>
  );
}