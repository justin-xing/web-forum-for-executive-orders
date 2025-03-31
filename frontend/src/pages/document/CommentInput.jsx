import React, { useState, useEffect } from 'react';

function CommentInput({ executiveOrderId}) {
  const [commentText, setCommentText] = useState('');
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUid(user.uid);
        console.log('User ID (uid):', user.uid);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uid == null) {
        return; // could add error popup
    }

    try {
      const response = await fetch(`/api/comment/comments/${executiveOrderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, message: commentText }),
      });

      if (response.ok) {
        setCommentText('');
        console.log('Comment submitted successfully');
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Failed to submit comment:', errorData.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="border rounded p-2 mb-2 w-full resize-none"
        rows="3"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Post Comment
      </button>
    </form>
  );
}

export default CommentInput;