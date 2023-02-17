import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import * as React from "react";
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
              for (const key of keys) {
                if (prev[key] === next[key]) {
                  return true;
                }
              }
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
