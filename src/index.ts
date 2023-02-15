/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import * as React from 'react';

export class EasyStateManager<T> {
  $state: BehaviorSubject<T>;
  constructor(initalValue: T) {
    this.$state = new BehaviorSubject<T>(initalValue);
  }

  useStateManager = (...keys: (keyof T)[]): T => {
    const [state, setState] = React.useState(this.$state.value);
    React.useEffect(() => {
      const subscription = this.$state
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
      return () => {
        subscription.unsubscribe();
      };
    }, [keys]);
    return state as T;
  };

  updateState = (cb: (draft: T) => any) => {
    const cloned = { ...this.$state.value };
    const updatedClone = cb(cloned);
    this.$state.next(updatedClone || cloned);
  };
}
