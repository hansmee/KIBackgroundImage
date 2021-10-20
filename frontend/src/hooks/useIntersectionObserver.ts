import { useEffect } from 'react';

const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 0.5,
  rootMargin = '-30px',
}: {
  root?: Element | null;
  target: Element | null;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    if (!target) {
      return undefined;
    }

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};

export default useIntersectionObserver;
