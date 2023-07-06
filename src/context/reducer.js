export const ACTION = {
  LOADING: "LOADING",
  SEARCH: "SEARCH",
  GET_POPULAR_ANIME: "GET_POPULAR_ANIME",
  GET_UPCOMING_ANIME: "GET_UPCOMING_ANIME",
  GET_AIRING_ANIME: "GET_AIRING_ANIME",
  GET_PICTURES: "GET_PICTURES",
  GET_VOICE_ACTOR: "GET_VOICE_ACTOR",
};

export const reducer = (state, action) => {
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
