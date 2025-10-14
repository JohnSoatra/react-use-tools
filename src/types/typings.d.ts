type Watcher<V> = {
  tracker: (tools: Tools) => V;
  callback: (value: V) => void;
}

type Watch = (typeof tools)['watch'];
