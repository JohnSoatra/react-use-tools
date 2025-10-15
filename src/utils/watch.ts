import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { generateId } from ".";

export function createWatch(props: {
  watchers: RefObject<Map<string, Watcher<any>>>;
  tracks: RefObject<Map<string, any>>;
}): Watch {
  return (tracker, options) => {
    const [_counter, setCounter] = useState(0);
    const id = useMemo(() => generateId(props.watchers.current.keys()), []);

    useEffect(() => () => {
      props.tracks.current.delete(id);
      props.watchers.current.delete(id);
    }, []);
    useEffect(() => {
      props.watchers.current.set(id, {
        tracker: tracker ?? ((tools) => tools),
        callback(value) {
          if (options?.reRender === undefined || options.reRender) {
            setCounter((counter) => counter + 1);
          }

          options?.callback?.(value);
        },
      });
    }, [tracker, options]);
  };
}
