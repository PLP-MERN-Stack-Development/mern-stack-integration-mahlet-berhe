import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = ['all', 'tech', 'travel', 'food', 'life'];

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const url =
      selectedCategory === 'all'
        ? 'http://localhost:5000/api/posts'
        : `http://localhost:5000/api/posts?category=${selectedCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setPosts(data.posts || []));
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Latest Posts</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow hover:shadow-md transition">
            <img
              src={`/images/${post.featuredImage}`}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.createdAt).toLocaleDateString()} • {post.viewCount} views
              </p>
              <p className="text-sm text-indigo-600 font-medium mb-1">{post.category?.name}</p>
              <p className="text-gray-700 text-sm mb-4">{post.excerpt}</p>
              <Link
                to={`/posts/${post._id}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;