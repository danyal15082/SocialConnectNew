import React, {createContext, useState} from 'react';
import {posts as initialPosts} from '../constants/DummyData';
import PostRepository from '../repositories/PostRepository';

export const PostsContext = createContext();

export const PostsProvider = ({children}) => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = caption => {
    const newPost = {
      id: Date.now().toString(),
      user: 'Kamran Afzal',
      time: new Date().toLocaleString(),
      content: caption,
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