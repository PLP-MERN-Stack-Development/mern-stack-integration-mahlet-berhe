import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-2">
        {post.excerpt || post.content?.slice(0, 100) + '...'}
      </p>
      <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
  Read More
</Link>
        
    </div>
  );
};

export default PostCard;