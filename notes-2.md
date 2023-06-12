## Global.jsx

```jsx
import React, { createContext, useContext } from "react";

// 1.
const GlobalContext = createContext();

// 2.
export const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={"hello world"}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3.
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
```

## App.jsx

```jsx
import { useGlobalContext } from "./context/Global";

function App() {
  // 4.
  const global = useGlobalContext();

  return <div className="App">{/* ... */}</div>;
}
```

## main.jsx

```jsx
import { GlobalContextProvider } from "./context/Global.jsx";

// 5.
React.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
```
