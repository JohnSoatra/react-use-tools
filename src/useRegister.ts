import useTools from "./useTools";

export default function useRegister(tools: Omit<Tools, 'notify' | 'watch'>) {
  (window as any).tools = useTools(tools);
}
