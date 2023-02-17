# rxdux-state-manager

A state management library developed using rxjs. it can as a React hook to manipulate state.
Inspired by redux

# Installation

`npm install rxdux-state-manager`

# API

## rxdux-state-manager

A state management library developed using rxjs. it can as a React hook to manipulate state.
Inspired by redux 

### Initializing state manager with rxdux-state-manager

dummyActions : When passing a function to the updater, the `draft` argument can be mutated freely, until the producer ends and the changes will be made immutable and become the next state.

# initalize state rxduxStore.ts

```javascript
import { EasyStateManager } from 'rxdux-state-manager';

export const {
  useStateManager: useGlobalState,
  $state: $globalState,
  updateState: updateGlobalState,
} = easyStateManager({
  count: 0,
  person: {
    name: "john doe",
    age: 22,
  },
});

export const dummyActions = {
  incr: () => {
    updateGlobalState((draft) => {
      draft.count = ++draft.count;
    });
  },
  incrAge: () => {
    updateGlobalState((draft) => {
      draft.person.age++;
    });
  },
};

```
### Using hook to get state

# here is Counter.tsx

```javascript
import React from 'react';
import { dummyActions, useGlobalState } from './rxduxStore';

export default function Counter() {
  const { count } = useGlobalState('count');
  return (
    <div className="p-2 rounded border border-blue-500">
      <p className="text-purple-600">{count}</p>
      <button className="border p-1 rounded" onClick={dummyActions.incr}>
        Increment
      </button>
    </div>
  );
}
```
# **$globalState** is rxjs *BehaviorSubject*. you can access *current state* by $globalState.value

# did you notice **onClick={dummyActions.incr}** ? that's all you need to update state from anywhere. no dispatch needed