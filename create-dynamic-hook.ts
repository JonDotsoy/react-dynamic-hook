import { createElement as e, createContext, FC, useContext } from 'react'

interface Hook<T> {
  (): T
}

export const createDynamicHook = <T>(o: Hook<T> | { hook: Hook<T> }) => {
  const hook = typeof o === 'function' ? o : o.hook;

  const ctx = createContext<T | null>(null);
  const Provider: FC<{ value?: T }> = ({ value, children }) => e(ctx.Provider, { value: value ?? hook() }, children);
  const getContext = () => useContext(ctx);
  const useHook = () => getContext() ?? hook();

  return {
    getContext,
    Provider,
    useHook,
  }
}