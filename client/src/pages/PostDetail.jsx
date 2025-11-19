import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setLoading(false);
    };

    fetchPost();

    // Increment view count
    fetch(`http://localhost:5000/api/posts/view/${id}`, { method: 'PUT' });

    // Fetch comments
    fetch(`http://localhost:5000/api/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, [id]);

  useEffect(() => {
    if (post?.category?.name) {
      fetch(`http://localhost:5000/api/posts?category=${post.category.name}`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.posts.filter(p => p._id !== post._id);
          setRelatedPosts(filtered.slice(0, 3));
        });
    }
  }, [post]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const res = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });

    const data = await res.json();
    if (res.ok) {
      setComments([...comments, data.comment]);
      setComment('');
      toast.success('Comment added!');
    } else {
      toast.error(data.message || 'Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-64 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded mt-10"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
        {new Date(post.createdAt).toLocaleDateString()} • {post.viewCount} views
      </p>
      {post.featuredImage && (
        <img
          src={`/images/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-6 whitespace-pre-line">
        {post.content}
      </p>
      <p className="text-sm text-indigo-600 font-medium uppercase tracking-wide">
        {post.category?.name}
      </p>

      {/* Author Info & Tags */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">About the Author</h3>
        <p className="text-sm text-gray-700 dark:text-gray-200">{post.author?.name || 'Anonymous'}</p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {post.tags?.split(',').map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white rounded-full text-xs font-medium"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {comments.map((c, i) => (
          <div key={i} className="mb-3 border-b pb-2">
            <p className="text-sm text-gray-700 dark:text-gray-200">{c.text}</p>
            <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
        {token && (
          <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded p-2 dark:bg-gray-900 dark:text-white"
              rows={3}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Post Comment
            </button>
          </form>
        )}
      </div>

      {/* Related Posts */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {relatedPosts.map(rp => (
            <Link
              key={rp._id}
              to={`/posts/${rp._id}`}
              className="block bg-white dark:bg-gray-700 p-4 rounded shadow hover:shadow-md transition"
            >
              <h4 className="text-lg font-bold text-indigo-600">{rp.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{rp.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;