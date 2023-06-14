# Practice

- createContext()
- useContext()
- useReducer()
- useEffect()

## Global.jsx

```jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext(); ✅

// base url
const baseURL = `https://...`; ✅

// actions ✅
const LOADING = "LOADING";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";

// reducer() ✅
const reducer = (state, action) => {
  switch(action.type){
    case LOADING:
      return {...state, loading:false}
    case GET_POPULAR_ANIME:
      return {...state, popularAnime: action.payload, loading: false}
    default:
      return state
  }
};

export const GlobalContextProvider = ({ children }) => {
  // inital state ✅
  const initalState = {
    loading: false,
    popularAnime: [],
  };

  // useReducer() ✅
  const [state, dispatch] = useReducer(reducer, initialState);

  // async await get data ✅
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter/popular`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  // useEffect() ✅
  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider value={...state}>
      {children}
    </GlobalContext.Provider>
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
  console.log(global);
  return (
    <div className="App">
      <Popular />
    </div>
  );
}
```

# main.jsx

```jsx
import { GlobalContextProvider } from "react";

React.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext.Provider>
      <App />
    </GlobalContext.Provider>
  </React.StrictMode>
);
```
