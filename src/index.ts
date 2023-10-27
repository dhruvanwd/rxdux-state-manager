import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { distinctUntilChanged } from "rxjs/internal/operators/distinctUntilChanged";
import React from "react";
import { produce } from "immer";

export function easyStateManager<T>(initalValue: T) {
  const $state = new BehaviorSubject<T>(initalValue);

  const useStateManager = (...keys: Array<keyof T>): T => {
    const [state, setState] = React.useState($state.value);
    React.useEffect(() => {
      const subscription = $state
        .pipe(
          distinctUntilChanged((prev, next) => {
            if (keys?.length) {
              const comparedKeys = keys.filter(
                (key) => prev[key] !== next[key]
              );
              return comparedKeys.length === 0;
            }
            return true;
          })
        )
        .subscribe({
          next: setState,
        });
      return () => subscription.unsubscribe();
    }, [keys.length]);
    return state as T;
  };

  const updateState = (cb: (draft: T) => any) => {
    const updatedClone = produce($state.value, cb);
    $state.next(updatedClone);
  };

  return {
    useStateManager,
    updateState,
    $state,
  };
}
