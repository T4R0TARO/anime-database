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

## Next steps...

1. Create inital state
   Create the inital state, this is where we will store the data from the API
   In this example we use an object of arrays. This is inside the Global Context Provider which as global scope throughout the App component
2. Get base URL from API
   Get the url from the api and store it in a variable
3. useReducer():
   useReducer() allows you to mangae state in a component and is an alternative use of useState() practicularly for managing complex state logic
   In this case we set the initalArgument as the initalState
   Then we create a reducer helper function outside of the component and return state. Now we can go to the GetContextProvider's value props and spread out the ...state
   What this does is since out initalArg is an obj of array we want to spread the data out instead of having the values come all at once
4. get data
   to get the data we used async await, first the response await fetch(url)
   then data await response.json() convert JSON data
   next display data by accees which part of the data we want to call

## Global.jsx pt2

```jsx
// outside component
const reducer = (state, action) => {
  return state
}

// inside component
export const GlobalContextProvider = ({children}) => {
  // inital state
  const initalState = {
    item1: [],
    item2: [],
    item3: [],
  }
  const [state, dispatch] = useReducer(reducer, initalState)

  // fetch item1 data
   const getItem1 = async () => {
    const response = await fetch(`https://...`);
    const data = await response.json();
    console.log(data)
   }

 return (
    <GloablContext.Provider value={
      ...state,
    }>
      {children}
    </GlobalContext.Provider>
  )
}
```

## Global.jsx pt3

1. Create actions variables: these variables will act as the action type in the `reducer` function as well as the type in the `dispatch`

```jsx
//...
// actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_ITEM = "GET_ITEM";

// reducer()
const reducer = (state, action) => {
  return state
}

export const GlobalContextProvider = ({children}) => {
  //...

  return (
    <GlobalContext.Provider value={...state}>
      {children}
    </GlobalContext.Provider>
  )
}
```

2. We reformat the `reducer()` and add a switch case so we can perform an actions based on the `case` on default we return `state`

```jsx
//...
// actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_ITEM = "GET_ITEM";

// reducer()
/*
  * `...state` spread out state THEN change the value that we want to change
  * `case GET_ITEM` here we are putting the data into the item1 arr in state and changing the loading value back to false
*/
const reducer = (state, action) => {
  switch(action.type){
    case LOADING:
      return {...state, loading: true}
    case GET_ITEM:
      return {...state, item1: action.playload, loadiing false }
    default:
      return state;
  }
}

export const GlobalContextProvider = ({children}) => {
  // ...

  // inital state
  const initalState = {
    item1: [],
    item2: [],
    item3: [],
  }

  const [state, dispatch] = useReducer(reducer, initalState)
/*
  *`dispatch({type:LOADING})` we are dispatching the loading action to run
  * `dispatch({type: GET_ITEM, payload:data}) we are dispatching the GET_ITEM action to run with the payload of the data that we got from the API
*/
  const getItem1Data = async () => {
    dispatch({type: LOADING})
    const response = await fetch(`https://...`)
    const data = await response.json();
    dispatch({type: GET_ITEM, payload: data})
  }

  return (
    <GlobalContext.Provider value={...state}>
      {children}
    </GlobalContext.Provider>
  )
}
```
