# rxdux-state-manager

A state management library developed using rxjs. Inspired by flux artitechture

# Installation

`npm install rxdux-state-manager`
**_OR_**
`yarn add rxdux-state-manager`

> it can be used as a React hook to consume state.

### Initializing state manager with rxdux-state-manager

### rxduxStore.ts

```javascript
import { easyStateManager } from "rxdux-state-manager";

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

_dummyActions_ : When passing a function to the updater, the `draft` argument can be mutated freely, until the producer ends and the changes will be made immutable and become the next state.

### Using hook to get state

### Here is Counter.tsx

```javascript
import React from "react";
import { dummyActions, useGlobalState } from "./rxduxStore";

export default function Counter() {
  const { count } = useGlobalState("count");
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

###### 1. const { count } = useGlobalState('count') . why does useGlobalState take "count" ?

Because "count" tells useGlobalState to rerender component only of count key in state changes.

###### 2. did you notice **onClick={dummyActions.incr}** ? that's all you need to update state from anywhere. no dispatch needed.

###### 3. $globalState is rxjs _BehaviorSubject_. you can access _current state_ by $globalState.value
