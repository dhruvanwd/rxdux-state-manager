# rxdux-state-manager

A powerful and flexible state management library developed using RxJS, inspired by the Flux architecture. Ideal for managing complex state in React applications.

## Installation

Easily integrate `rxdux-state-manager` into your project:

```sh
npm install rxdux-state-manager
```

or

```sh
yarn add rxdux-state-manager
```

> **Tip:** This library can be used as a React hook for efficient state management.

## Getting Started with rxdux-state-manager

### Initializing the State Manager

Initialize the state manager to manage your application's state effectively.

#### counter-state-manager.ts

```javascript
import { easyStateManager } from "rxdux-state-manager";

export const {
  useStateManager: useGlobalState,
  $state: $globalState,
  updateState: updateGlobalState,
} = easyStateManager({
  count: 0,
  person: {
    name: "John Doe",
    age: 22,
  },
});

class CounterActions {
  incr = () => {
    updateGlobalState((draft) => {
      draft.count++;
    });
  };

  incrAge = () => {
    updateGlobalState((draft) => {
      draft.person.age++;
    });
  };
}

export const counterActions = new CounterActions();
```

**Key Feature:** When passing a function to the updater, the `draft` argument can be mutated freely. Changes will be made immutable and become the next state once the producer ends.

### Using the Hook to Access and Update State

Learn how to use the hook to consume and update state in your React components.

#### Counter.tsx

```javascript
import React from "react";
import { counterActions, useGlobalState } from "./counter-state-manager";

export default function Counter() {
  const { count } = useGlobalState("count");
  
  return (
    <div className="p-2 rounded border border-blue-500">
      <p className="text-purple-600">{count}</p>
      <button className="border p-1 rounded" onClick={counterActions.incr}>
        Increment
      </button>
    </div>
  );
}
```

### Why Use rxdux-state-manager?

1. **Selective Rerendering:** Use `const { count } = useGlobalState('count')` to rerender components only when specific state keys change, improving performance.
2. **Effortless State Updates:** Simplify state updates with `onClick={counterActions.incr}` without the need for dispatchers.

### Accessing Current State with RxJS BehaviorSubject

`$globalState` is an RxJS `BehaviorSubject`, allowing you to access the current state anywhere in your application:

```javascript
const state = $globalState.value; 
console.log(state.person.age);
```

### Using Multiple State Keys with useGlobalState

The `useGlobalState` hook can take multiple arguments for accessing various state keys:

```javascript
const { count, person } = useGlobalState("count", "person");
console.log({
  count,
  person,
});
```

## Advantages of Using rxdux-state-manager

- **Efficient State Management:** Manage your application’s state efficiently with RxJS and React.
- **Scalable and Maintainable:** Ideal for complex applications requiring a scalable and maintainable state management solution.
- **Improved Performance:** Optimize performance with selective rerendering and immutable state updates.

## License

This project is licensed under the MIT License.
