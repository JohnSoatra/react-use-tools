import useTools from "./useTools";

export default function useRegister(tools: Tools) {
  (window as any).tools = useTools(tools);
}
