# NOTES

## What did I do? project set-up

- create components folder
- create file `Popular.jsx` component and displayed in `Apps.jsx` component
- create context folder
- create file `Global.jsx` component which will be globally accesible || have f() that are globally accesible

## What do I need to review?

- aysnc await
- React.useEffect()

## What do new concepts/tools did I just encounter?

- React.createContext()
- React.useContext()
- React.useReducer()

### What is the purpose of this file? `Global.jsx`

- When page first loads to retrieve data from an API
- Create an empty state that will have global accessibility and wil be used later

### React.createContext()

```jsx
const GlobalContext = createContext();

{...}

// Define a provider component
export const GlobalContextProvider = ({ children }) => {
  // inital state
  const initalState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  //actions
  const LOADING = "LOADING";
  const SEARCH = "SEARCH";
  const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
  const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
  const GET_AIRING_ANIME = "GET_AIRING_ANIME";

  // useReducer
  const [state, dispatch] = useReducer(reducer, initalState);

  // fetch popular anime
  const getPopularAnime = async () => {
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    console.log(data.data);
  };

  // useEffect()
  useEffect(() => {
    getPopularAnime();
  }, []);

  // `...state` spreads out data from `initialState`
  return (
    <GlobalContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
```

This is where you explain...

### React.useContext()

```jsx
// useContext()
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
```

This is where you explain...

### React.useReducer()

```jsx
// reducer
const reducer = (state, action) => {
  return state;
};

// useReducer
const [state, dispatch] = useReducer(reducer, initalState);
```

This is where you explain...

### 19:00
