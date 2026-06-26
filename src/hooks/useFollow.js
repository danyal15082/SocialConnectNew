import {useState} from 'react';

const useFollow = (initialState = false) => {
  const [isFollowing, setIsFollowing] = useState(initialState);

  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;