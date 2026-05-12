// src/hooks/useInfiniteScroll.js
import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

export default function useInfiniteScroll(callback, hasMore, isLoading) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const loadMore = useCallback(() => {
    if (inView && hasMore && !isLoading) {
      callback();
    }
  }, [inView, hasMore, isLoading, callback]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return { ref };
}