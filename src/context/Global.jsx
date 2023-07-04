import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

const ACTION = {
  LOADING: "LOADING",
  SEARCH: "SEARCH",
  GET_POPULAR_ANIME: "GET_POPULAR_ANIME",
  GET_UPCOMING_ANIME: "GET_UPCOMING_ANIME",
  GET_AIRING_ANIME: "GET_AIRING_ANIME",
  GET_PICTURES: "GET_PICTURES",
  GET_VOICE_ACTOR: "GET_VOICE_ACTOR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true };
    case ACTION.GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case ACTION.GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case ACTION.GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case ACTION.GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    case ACTION.GET_VOICE_ACTOR:
      return { ...state, voiceActor: action.payload, loading: false };
    case ACTION.SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    default:
      return state;
  }
};

// Provider
export const GlobalContextProvider = ({ children }) => {
  const initalState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    voiceActor: [],
    loading: false,
  };

  // useReducer for initalState
  const [state, dispatch] = useReducer(reducer, initalState);

  // Form Input State
  const [search, setSearch] = useState("");

  // Form Input Onchange
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  // Form Search Button onClick
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter a search term");
    }
  };

  // fetch popular anime data
  const getPopularAnime = async () => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: ACTION.GET_POPULAR_ANIME, payload: data.data });
  };

  // fetch airing anime data
  const getAiringAnime = async () => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: ACTION.GET_AIRING_ANIME, payload: data.data });
  };

  // fetch upcoming anime data
  const getUpcomingAnime = async () => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`${baseUrl}/seasons/upcoming?sfw`);
    const data = await response.json();
    dispatch({ type: ACTION.GET_UPCOMING_ANIME, payload: data.data });
  };

  // fetch search anime data
  const searchAnime = async (anime) => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: ACTION.SEARCH, payload: data.data });
  };

  // fetch anime pictures data
  const getAnimePictures = async (id) => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const data = await response.json();
    dispatch({ type: ACTION.GET_PICTURES, payload: data.data });
  };

  // fetch getVoiceActor data
  const getVoiceActor = async (id) => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`https://api.jikan.moe/v4/people/${id}/full`);
    const data = await response.json();
    dispatch({ type: ACTION.GET_VOICE_ACTOR, payload: data.data });
  };

  const [myWatchlist, setMyWatchlist] = useState([]);
  const [finishedAnimeMap, setFinishedAnimeMap] = useState({});

  useEffect(() => {
    getPopularAnime();
  }, []);

  // `...state` spreads out data from `initialState`
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        search,
        handleSubmit,
        searchAnime,
        getAiringAnime,
        getUpcomingAnime,
        getPopularAnime,
        getAnimePictures,
        getVoiceActor,
        myWatchlist,
        setMyWatchlist,
        finishedAnimeMap,
        setFinishedAnimeMap,
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
