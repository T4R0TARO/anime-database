import React, { useReducer, createContext, useContext, useEffect } from "react";

// Create a new context
const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// reducer
const reducer = (state, action) => {
  return state;
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

// useContext()
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
