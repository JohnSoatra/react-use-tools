# React Use Tools

A small library to manage global reactive tools across your React application.

## Version

**2.0.0 – Breaking changes:**

- `tools.notify()` removed.
- `tools.watch()` now accepts `tracker` and `options` parameters.

## Features

- Globally accessible `tools` object
- Extendable `Tools` interface using TypeScript `declare global`
- Register tools once in `RootLayout` or `MainLayout`
- Reactive updates with `tools.watch()` hook
- Optionally track specific properties with `tracker` and `callback`

## Installation

```bash
npm install react-use-tools
```

## Usage

### 1. Extend Tools Interface

Create a `global.d.ts` file in your project:

```typescript
// global.d.ts
declare global {
  interface Tools {
    username: string;
    setUsername: (name: string) => void;
    navigate: (path: string) => void;
    increment?: () => void;
  }
}

export {};
```

### 2. Register Tools in Layout

Register tools in your root or main layout component:

```tsx
// RootLayout.tsx
import { useState } from 'react';
import { registerTools } from 'react-use-tools';

export default function RootLayout({ children }) {
  const [username, setUsername] = useState('Current Name');

  registerTools({
    username,
    setUsername: (name: string) => setUsername(name),
    navigate(path) {
      console.log('Navigating to', path);
    },
    increment() {
      console.log('Increment clicked');
    }
  });

  return <>{children}</>;
}
```

### 3. Use Tools Anywhere

Access `tools` in any component under the layout:

```tsx
// HomePage.tsx
export default function HomePage() {
  return (
    <div>
      Username: {tools.username}
      <button onClick={() => tools.navigate('/about')}>
        Go to About
      </button>
    </div>
  );
}
```

### 4. Reactive Tools

Call `tools.watch()` to re-render the component when tools update. You can also track specific properties:

```tsx
// CounterPage.tsx
export default function CounterPage() {
  // Re-render when username changes
  tools.watch((t) => t.username, {
    callback: (value) => console.log('Username changed:', value),
    reRender: true, // default is true
  });

  return (
    <div>
      Current Username: {tools.username}
      <button onClick={() => tools.setUsername('New Name')}>
        Change Name
      </button>
    </div>
  );
}
```

## API

### `registerTools(tools)`

Registers tools globally. Call once in your root layout.

```tsx
registerTools({
  username: 'John',
  setUsername(name) {},
  navigate(path) {},
});
```

### `tools.watch(tracker?, options?)`

Makes the component reactive. Call inside any functional component that needs to re-render when tools change.

- **tracker**: optional function to pick which tool property to watch. Defaults to all tools.
- **options**: object with optional properties:
  - `reRender` (boolean) – whether to re-render the component when the watched value changes. Defaults to `true`.
  - `callback(value)` – called with the new value whenever the tracked property changes.

```tsx
tools.watch(
  (t) => t.username, // track username only
  {
    reRender: true,
    callback: (newName) => console.log('Username changed:', newName)
  }
);
```

## Notes

- `tools` must be registered before usage in child components.
- Use `tools.watch()` only in components that need reactivity.
- Extend `Tools` interface in your project without modifying library code.
- TypeScript support included.

## License

MIT
