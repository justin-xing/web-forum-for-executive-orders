import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ControversialComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchControversialComments = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/comment/controversial-comments");
        
        if (!response.ok) {
          throw new Error("Failed to fetch controversial comments");
        }
        
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching controversial comments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchControversialComments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Controversial Comments</h1>
      <p className="text-gray-600 mb-8">
        These are the comments with the closest balance between upvotes and downvotes,
        indicating divided opinions.
      </p>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-500">No controversial comments found.</div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.cid} className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link 
                    to={`/document/${comment.executive_order_id}`} 
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {comment.document_title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    Comment by <span className="font-medium">{comment.user_name}</span> • {formatDate(comment.timestamp)}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-green-600 font-medium">{comment.upvotes || 0}</span>
                    <svg className="w-4 h-4 ml-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-600 font-medium">{comment.downvotes || 0}</span>
                    <svg className="w-4 h-4 ml-1 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{comment.message}</p>
              <div className="mt-4 text-xs text-gray-500">
                Controversy score: {comment.controversy_score} (lower = more controversial)
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControversialComments; 