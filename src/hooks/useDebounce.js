import * as React from "react";
import { debounce } from "lodash";

const useDebounce = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = React.useMemo(() => {
    const func = (a, b) => {
      ref.current?.(a, b);
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

export default useDebounce;
