import React, {createContext, useState} from 'react';

import PostRepository from '../repositories/PostRepository';

export const PostsContext = createContext();

export const PostsProvider = ({children}) => {
  const [posts, setPosts] = useState([]);

  const addPost = (caption, userName, attachment, authorId) => {
    const newPost = {
      id: Date.now().toString(),
      user: userName || 'Social Connect User',
      authorId: authorId || null,
      time: new Date().toLocaleString(),
      content: caption,
      attachment,
      likes: 0,
    };

    setPosts(prev =>
      PostRepository.create(prev, newPost),
    );
  };

  const deletePost = id => {
    setPosts(prev =>
      PostRepository.delete(prev, id),
    );
  };

  const updatePost = (id, content) => {
    setPosts(prev =>
      PostRepository.update(prev, id, content),
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        updatePost,
      }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;