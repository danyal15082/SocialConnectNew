import {useCallback, useState} from 'react';

import {toggleFollowRelationship} from '../services/followService';

const useFollow = ({initialState = false, followerId, followingId} = {}) => {
  const [isFollowing, setIsFollowing] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleFollow = useCallback(async () => {
    if (!followerId || !followingId) {
      return;
    }

    setLoading(true);

    try {
      const result = await toggleFollowRelationship({
        followerId,
        followingId,
        currentStatus: isFollowing,
      });

      if (result?.success) {
        setIsFollowing(Boolean(result.following));
      }
    } finally {
      setLoading(false);
    }
  }, [followerId, followingId, isFollowing]);

  return {
    isFollowing,
    loading,
    toggleFollow,
  };
};

export default useFollow;