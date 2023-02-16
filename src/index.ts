import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import React from "react";

export function easyStateManager<T>(initalValue: T) {
  const $state = new BehaviorSubject<T>(initalValue);

  function useStateManager(...keys: (keyof T)[]): T {
    const [state, setState] = React.useState<T>($state.value);
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
    }, [keys]);
    return state as T;
  }

  const updateState = (cb: (draft: T) => any) => {
    const cloned = { ...$state.value };
    const updatedClone = cb(cloned);
    $state.next(updatedClone || cloned);
  };

  return {
    $state,
    useStateManager,
    updateState,
  };
}
