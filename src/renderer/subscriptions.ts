  /**
 * Utilities for subscription and change monitoring with stable references.
 * Particularly of use with the React Context API to allow state / event sharing
 * without re-renders.
 */
import { useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";

export type Listener<ListenerArg, ListenerReturnValue = void> = (
  arg: ListenerArg,
) => ListenerReturnValue;
export type Subscriber<ListenerArg, ListenerReturnValue = void> = (
  listener: Listener<ListenerArg, ListenerReturnValue>,
) => () => void;
export type SubscriptionChannel<ListenerArg, ListenerReturnValue> = {
  broadcast: (arg: ListenerArg) => ListenerReturnValue[];
  subscribe: Subscriber<ListenerArg, ListenerReturnValue>;
};
export type ChangeSubscriptionChannel<Value> = {
  get: () => Value;
  set: (value: Value) => void;
  onChange: Subscriber<Value>;
};

/**
 * Provides stable references to broadcast and subscribe methods. Enables
 * creation of a central dispatch with handlers that don't update, and thus
 * won't trigger re-renders.
 */
export const useSubscriptionChannel = <
  ListenerArg,
  ListenerReturnValue = void,
>(): SubscriptionChannel<ListenerArg, ListenerReturnValue> => {
  const listeners = useRef<
    Record<string, Listener<ListenerArg, ListenerReturnValue>>
  >({});

  const subscribe = useCallback(
    (listener: Listener<ListenerArg, ListenerReturnValue>) => {
      const id = uuid();
      listeners.current[id] = listener;
      return () => {
        delete listeners.current[id];
      };
    },
    [],
  );

  const broadcast = useCallback((value: ListenerArg): ListenerReturnValue[] => {
    return Object.values(listeners.current).map((listener) => listener(value));
  }, []);

  return {
    broadcast,
    subscribe,
  };
};

/**
 * Provides stable references to get, set, and onChange methods to maintain and
 * monitor a value. Enables creation of a central state dispatch with state
 * management and monitoring handlers that don't update, and thus won't trigger
 * re-renders.
 */
export const useChangeSubscriptionChannel = <Value>(
  defaultValue: Value,
): ChangeSubscriptionChannel<Value> => {
  const valueRef = useRef<Value>(defaultValue);
  const { broadcast, subscribe: onChange } = useSubscriptionChannel<Value>();

  const get = useCallback(() => valueRef.current, []);
  const set = useCallback(
    (value: Value) => {
      if (valueRef.current !== value) {
        valueRef.current = value;
        broadcast(value);
      }
    },
    [broadcast],
  );

  return {
    get,
    set,
    onChange,
  };
};