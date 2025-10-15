import { useEffect, useMemo, useRef } from "react";
import { createWatch } from "./utils/watch";

export default function useTools(props: Tools): typeof tools {
  const watchers = useRef<Map<string, Watcher<any>>>(new Map());
  const tracks = useRef<Map<string, any>>(new Map());
  const watch = useMemo(() => createWatch({ watchers, tracks }), []);

  useEffect(() => {
    watchers.current.forEach((watcher, key) => {
      const newValue = watcher.tracker(props);

      if (tracks.current.get(key) !== newValue) {
        tracks.current.set(key, newValue);
        watcher.callback(newValue);
      }
    });
  }, [props]);

  return useMemo(() => {
    const cloneProps = Object.create(
      Object.getPrototypeOf(props),
      Object.getOwnPropertyDescriptors(props)
    );
    cloneProps.watch = watch;

    return cloneProps;
  }, [props]);
}
