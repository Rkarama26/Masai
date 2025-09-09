import React, { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataFetcher: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading data...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Fetched Posts</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
