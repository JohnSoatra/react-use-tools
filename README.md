# React Use Tools

A small library to manage global reactive tools across your React application.

## Features

- Globally accessible `tools` object
- Extendable `Tools` interface using TypeScript `declare global`
- Register tools once in RootLayout or MainLayout
- Reactive updates with `tools.watch()` hook

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
    name: string;
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
import { registerTools } from 'react-use-tools';

export default function RootLayout({ children }) {
  registerTools({
    name: 'Soatra',
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
      Name: {tools.name}
      <button onClick={() => tools.navigate('/about')}>
        Go to About
      </button>
    </div>
  );
}
```

### 4. Reactive Tools (Optional)

Call `tools.watch()` to re-render when tools update:

```tsx
// CounterPage.tsx
export default function CounterPage() {
  tools.watch(); // Component re-renders on tools.notify()

  return (
    <div>
      Counter: {tools.increment ? 'Available' : 'Not Available'}
      <button onClick={() => tools.increment?.()}>
        Increment
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
  // Your tool functions and values
});
```

### `tools.watch()`

Makes the component reactive. Call inside any functional component that needs to re-render when tools change.

```tsx
function MyComponent() {
  tools.watch();
  // Component re-renders on tools.notify()
}
```

### `tools.notify()`

Triggers re-render in all components using `tools.watch()`.

```tsx
tools.notify(); // All watching components re-render
```

## Notes

- `tools` must be registered before usage in child components
- Use `tools.watch()` only in components that need reactivity
- Extend `Tools` interface in your project without modifying library code
- TypeScript support included

## License

MIT