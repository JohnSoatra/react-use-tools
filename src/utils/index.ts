export function generateId(current:Iterable<string>) {
  const existing = new Set(current);
  let id: string;

  do {
    id = crypto.randomUUID();
  } while (existing.has(id));

  return id;
}
