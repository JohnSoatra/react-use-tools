export function generateId(current: string[]) {
  let id: string;

  do {
    id = crypto.randomUUID();
  } while (current.includes(id));

  return id;
}
