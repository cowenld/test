export const searchSuccess = songs => {
  return {
    type: "SEARCH_SUCCESS",
    songs
  };
};

export const search = (searchTerm, accessToken) => {
  return dispatch => {
    const request = new Request(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          Accept: "application/json"
        })
      }
    );

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        res.items = res.tracks.items.map(item => {
          return {
            track: item
          };
        });
        dispatch(searchSuccess(res.items));
      })
      .catch(err => {
        console.log("error", err);
      });
  };
};
