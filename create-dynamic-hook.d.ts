import { FC } from 'react';
interface Hook<T> {
    (): T;
}
export declare const createDynamicHook: <T>(o: Hook<T> | {
    hook: Hook<T>;
}) => {
    getContext: () => T | null;
    Provider: FC<{
        value?: T | undefined;
    }>;
    useHook: () => T;
};
export {};
