import {useState} from 'react';

const useLike = (initialLikes = 0) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }

    setLiked(!liked);
  };

  return {
    liked,
    likes,
    toggleLike,
  };
};

export default useLike;