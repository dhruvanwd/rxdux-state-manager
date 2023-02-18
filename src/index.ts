import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import React from "react";
import produce from "immer";

export function easyStateManager<T>(initalValue: T) {
  const $state = new BehaviorSubject<T>(initalValue);

  const useStateManager = (...keys: Array<keyof T>): T => {
    const [state, setState] = React.useState($state.value);
    React.useEffect(() => {
      const subscription = $state
        .pipe(
          distinctUntilChanged((prev, next) => {
            if (keys) {
              const comparedKeys = keys.filter(
                (key) => prev[key] !== next[key]
              );
              return comparedKeys.length === 0;
            }
            return false;
          })
        )
        .subscribe({
          next: setState,
        });
      return () => subscription.unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys?.join("")]);
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
