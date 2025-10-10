import { useEffect, useMemo, useState } from "react";
import { caller } from "./utils";

export default function useTools(props: Omit<Tools, 'notify' | 'watch'>): Tools {
  const [callbacks, setCallbacks] = useState<Record<string, () => void>>({});

  useEffect(() => {
    for (const key in callbacks) {
      callbacks[key]();
    }
  }, [callbacks, props]);

  return useMemo(() => ({
    ...props,
    notify() {
      for (const key in callbacks) {
        callbacks[key]();
      }
    },
    watch() {
      const [_, setCounter] = useState(0);
      const callerName = caller(1);

      useEffect(() => {
        setCallbacks((callbacks) => ({
          ...callbacks,
          [callerName]: () => {
            setCounter(a => a + 1);
          }
        }));
      }, []);

      return () => {
        setCallbacks(callbacks => {
          const { [callerName]: _, ...rest } = callbacks;
          return rest;
        });
      };
    }
  }), [props, callbacks]);
}
