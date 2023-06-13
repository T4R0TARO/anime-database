import React, { useReducer, createContext, useContext, useEffect } from "react";

// Create a new context
const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// reducer ORG
// const reducer = (state, action) => {
//   return state;
// };

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    default:
      return state;
  }
};

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

  // useReducer
  const [state, dispatch] = useReducer(reducer, initalState);

  // fetch popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    // console.log(data.data);
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
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

// useContext()
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
