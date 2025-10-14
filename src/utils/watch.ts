import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { generateId } from ".";

export function createWatch(props: {
  watchers: Record<string, Watcher<any>>;
  previousValue: RefObject<Map<string, any>>;
  setWatchers: Dispatch<SetStateAction<Record<string, Watcher<any>>>>;
}): Watch {
  return (tracker, options) => {
    const watcherId = useRef(generateId(Object.keys(props.watchers)));
    const [_counter, setCounter] = useState(0);

    function clearState() {
      props.previousValue.current.delete(watcherId.current);
      props.setWatchers((prev) => {
        const { [watcherId.current]: _, ...rest } = prev;
        return rest;
      });
    }

    useEffect(() => clearState, []);
    useEffect(() => {
      props.setWatchers((prev) => ({
        ...prev,
        [watcherId.current]: {
          tracker: tracker ?? ((tools) => tools),
          callback: (value) => {
            if (options?.reRender === undefined || options.reRender) {
              setCounter((counter) => counter + 1);
            }
            options?.callback?.(value);
          },
        },
      }));
    }, [tracker?.toString(), JSON.stringify(options)]);
  };
}
