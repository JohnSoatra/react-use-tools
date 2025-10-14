import { useEffect, useMemo, useRef, useState } from "react";
import { createWatch } from "./utils/watch";

export default function useTools(props: Tools): typeof tools {
  const previousValue = useRef<Map<string, any>>(new Map());
  const [watchers, setWatchers] = useState<Record<string, Watcher<any>>>({});

  useEffect(() => {
    for (const key in watchers) {
      const watcher = watchers[key];
      const newValue = watcher.tracker(props);

      if (previousValue.current.get(key) !== newValue) {
        previousValue.current.set(key, newValue);
        watcher.callback(newValue);
      }
    }
  }, [watchers, props]);

  return useMemo(() => {
    const cloneProps = Object.create(
      Object.getPrototypeOf(props),
      Object.getOwnPropertyDescriptors(props)
    );

    return Object.assign(cloneProps, {
      watch: createWatch({
        watchers,
        setWatchers,
        previousValue
      })
    });
  }, [props]);
}
