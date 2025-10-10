export function caller(level: number) {
  const err = new Error();
  const stack = err.stack?.split('\n') || [];

  return stack[2 + level]?.trim().split(/\s+/).slice(1).join('');
}
