import { useEffect, useRef, useState } from 'react';

const useDebounce = <V>(value: V, delay: number): V => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }

    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handlerRef.current ?? undefined);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
