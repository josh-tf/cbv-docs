import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";

export default class DocsDelete extends Component {
  componentDidMount() {
    axios
      .get(
        "https://cbv-docs-backend.herokuapp.com/docs/delete/" +
          this.props.match.params.id
      )
      .then(response => {
        this.props.upList();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <DocumentTitle title={"Computerbank Docs: Document Deleted"} />

        <h2>Document Deleted</h2>

        <div class="alert alert-success" role="alert">
          The selected document (<b>ID:</b> {this.props.match.params.id}) has
          successfully been deleted from the database.
        </div>

        <br />

        <div className="form-group">
          <Link to={"/"}>
            <button class="btn btn-default btn-icon-notika waves-effect">
              <i class="notika-icon notika-left-arrow" /> Return to Document
              List
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
