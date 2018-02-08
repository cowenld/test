import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../actions/song";
import "./Search.css";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={() => {
            this.props.search(this.state.searchTerm, this.props.token);
          }}
          className="form-group search-form"
        >
          <input
            onChange={this.updateSearchTerm}
            type="text"
            placeholder="Type a song..."
            className="form-control search-input"
          />
          <button
            onClick={() => {
              this.props.search(this.state.searchTerm, this.props.token);
            }}
            className="btn btn-success search-btn"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      search
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
