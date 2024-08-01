import React, { useState } from 'react';

function CommentBox() {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentComment.trim() !== '') {
      if (editingIndex !== null) {
        const updatedComments = [...comments];
        updatedComments[editingIndex] = currentComment;
        setComments(updatedComments);
        setEditingIndex(null);
      } else {

        setComments([...comments, currentComment]);
      }
      setCurrentComment('');
    }
  };

  const handleEdit = (index) => {
    setCurrentComment(comments[index]);
    setEditingIndex(index);
  };

  const dele = (indexToDelete) => {
    setComments(comments.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <form className='flex flex-col p-10' onSubmit={handleSubmit}>
        <textarea
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button type="submit">
          {editingIndex !== null ? 'Update' : 'Post'}
        </button>
      </form>
      <div className='flex flex-col text-red-700 justify-center items-center'>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className='flex gap-2'>
              <div key={index}>
                <p className='border-b-2 border-gray-500 cursor-pointer ' onClick={() => handleEdit(index)}>{comment}</p>
              </div>
              <p className='text-red-500 font-bold cursor-crosshair' onClick={() => dele(index)}>X</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommentBox;