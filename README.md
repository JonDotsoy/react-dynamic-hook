# React-Dynamic-Hook

Easy create hook to react. Allow create call hooks to use in provide context or simple app without context.


### Sample

```ts
// ./components/user.ts
import { createDynamicHook } from "@jondotsoy/react-dynamic-hook";
import { useEffect } from "react";
import { auth, User } from "./my-auth-srv";


const useUserHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    user,
  };
}

const hook = createDynamicHook(useUserHook);

export const useUser = hook.useHook;
export const UserProvider = hook.Provider;
```

```tsx
// _app.tsx
import { UserProvider } from "./components/user"
import type { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}

export default App;
```

Without context:

```ts
// simple_app.tsx
import { useUser } from "./components/user"

const SimpleApp = () => {
  const { loading, user } =  useUser();

  // ...
}

export default SimpleApp;
```
