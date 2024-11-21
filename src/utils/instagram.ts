import axios from 'axios';

export interface InstagramComment {
  username: string;
  text: string;
}

export const extractPostId = (url: string): string | null => {
  const patterns = [
    /instagram\.com\/p\/([^/?]+)/,
    /instagram\.com\/reel\/([^/?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const fetchInstagramComments = async (postUrl: string): Promise<string[]> => {
  const postId = extractPostId(postUrl);
  if (!postId) {
    throw new Error('Invalid Instagram URL');
  }

  try {
    // Replace this URL with your actual Instagram proxy server
    const response = await axios.get(`https://your-instagram-proxy.com/comments/${postId}`);
    
    if (!response.data || !Array.isArray(response.data.comments)) {
      throw new Error('Invalid response format');
    }

    return response.data.comments.map((comment: InstagramComment) => comment.username);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Instagram post not found');
      }
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later');
      }
    }
    throw new Error('Failed to fetch Instagram comments');
  }
};