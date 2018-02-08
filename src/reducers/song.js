const defaultState = {
  songPlaying: false
};

export const songs = (state = defaultState, action) => {
  switch (action.type) {
    case "SEARCH_SUCCESS":
      return {
        ...state,
        songs: action.songs
      };

    default:
      return state;
  }
};

export default songs;
