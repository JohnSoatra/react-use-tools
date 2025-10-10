export {};

declare global {
  interface Tools {
    notify: () => void;
    watch: () => void;
  }

  const tools: Tools;
}
