import { useRef } from 'react';

const useConst = (valoare) => {
  const ref = useRef();
  ref.current = {
    value: typeof valoare === 'function' ? valoare() : valoare,
  };
  return ref.current.value;
};

export { useConst };
