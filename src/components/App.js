import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../actions/user";
import { setToken } from "../actions/token";
import Header from "./Header";
import Search from "./Search";
import ItemGrid from "./ItemGrid";

class App extends Component {
  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);

    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = "21b49bd99e844b4b87eaf635865dcee5";
    const redirectUri = "http://localhost:3000";
    const scopes = [
      "user-read-birthdate",
      "user-read-email",
      "user-read-private"
    ];

    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token`;
    } else {
      this.props.setToken(hashParams.access_token);
    }
  }

  componentWillReceiveProps(props) {
    if (props.token) {
      this.props.fetchUser(props.token);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-xs-12">
              <Search />
            </div>
            <div className="col-xs-12">
              <div className="row">
                <ItemGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token.token,
    song: state.songsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser,
      setToken
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
