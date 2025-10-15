const RandomRange = 100000000;

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateId(): string {
  const randomNow = new Date().getTime() + random(0, RandomRange);

  return randomNow.toString(36);
}
export function uniqueId(current: Iterable<string>) {
  const existing = new Set(current);
  let id: string;

  do {
    id = generateId();
  } while (existing.has(id));

  return id;
}
