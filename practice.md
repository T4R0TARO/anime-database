# Practice

- createContext()
- useContext()
- useReducer()
- useEffect()

## Global.jsx

```jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

const GlobalContext = createContext();

// baseURL
const baseUrl = `https://...`;

// actions
const ACTION = {
  LOADING: "LOADING",
  GET_POPULAR_ANIME: "GET_POPULAR_ANIME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "GET_POPULAR_ANIME":
      return { ...state, popularAnime: action.payload, loading: false };
    default:
      throw new Error();
  }
};

export const GlobalContextProvider = ({ children }) => {
  // inital state
  const initalState = {
    loading: false,
    popularAnime: [],
  };

  //  useReducer
  const [state, dispatch] = useReducer(reducer, initalState);

  // async await 'get data'
  const getPopularAnime = async () => {
    dispatch({type: ACTION.LOADING})
    const response = await fetch(`${baseUrl}/top/anime?filter/popularity`);
    const data = await response.json();
    dispatch({type: ACTION.GET_POPULAR_ANIME, payload: data.data})
    console.log(data.data);
  };
  // useEffect
  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider value={...state}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
```

## App.jsx

```jsx
import { useGlobalContext } from "./context/Global";

function App() {
  const global = useGlobalContext();
  return (
    <div className="App">
      <Popular />
    </div>
  );
}
```

# main.jsx

```jsx
import { GlobalContextProvider } from "./context/Global";

React.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext.Provider>
      <App />
    </GlobalContext.Provider>
  </React.StrictMode>
);
```
