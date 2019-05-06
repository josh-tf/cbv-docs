import React, { Component } from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import axios from "axios";

const Docs = props => (
  <tr>
    <td>{props.docs.doc_title}</td>
    <td>{props.docs.doc_slug}</td>
    <td>
      <Link to={"/view/" + props.docs.doc_slug}>
        <button class="btn btn-default btn-sm waves-effect">
          <i class="notika-icon notika-eye" /> View
        </button>
      </Link>
    </td>
    <td>
      <Link to={"/edit/" + props.docs._id}>
        <button class="btn btn-default btn-sm waves-effect">
          <i class="notika-icon notika-edit" /> Edit
        </button>
      </Link>
    </td>
    <td>
      <Link to={"/delete/" + props.docs._id}>
        <button class="btn btn-danger btn-sm notika-btn-red waves-effect">
          <i class="notika-icon notika-close" /> Delete
        </button>
      </Link>
    </td>
  </tr>
);

export default class DocsList extends Component {
  docsList() {
    return this.props.docArr.map(function(currentDoc, i) {
      return <Docs docs={currentDoc} key={i} />;
    });
  }

  render() {
    console.log(this.props.docArr);
    return (
      <div>
        <DocumentTitle title="Computerbank Docs: Document List" />
        <h3>Document List</h3>
        <table className="table table-sc-ex table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>View Doc</th>
              <th>Last Edited</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.docsList()}</tbody>
        </table>
      </div>
    );
  }
}
