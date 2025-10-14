export {};

declare global {
  interface Tools {}

  const tools: Tools & {
    watch: <V>(
      tracker?: (tools: Tools) => V,
      options?: {
        callback?: (value: V) => void;
        reRender?: boolean;
      }
    ) => void;
  };
}
