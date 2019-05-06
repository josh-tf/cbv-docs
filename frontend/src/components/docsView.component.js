import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";

//edtior
import { editor_state, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles.css";

export default class DocsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      doc_title: "",
      editor_state: "",
      doc_contents: "",
      doc_slug: "",
      doc_last_edited: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://cbv-docs-backend.herokuapp.com/docs/slug/" +
          this.props.match.params.slug
      )
      .then(response => {
        var json = JSON.parse(response.data.doc_contents);
        var contentState = convertFromRaw(json);

        this.setState({
          _id: response.data._id,
          doc_title: response.data.doc_title,
          editor_state: editor_state.createWithContent(contentState),
          doc_slug: response.data.doc_slug,
          doc_last_edited: response.data.doc_last_edited
        });
        console.log(this.state.doc_slug);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { editor_state } = this.state;

    return (
      <div>
        <DocumentTitle title={"Computerbank Docs: " + this.state.doc_title} />
        <h2>{this.state.doc_title}</h2>
        <h6>Last Edited: dd/mm/yyyy by Mr Bean</h6>

        <div className="doc-view">
          <Editor
            editorState={editor_state}
            toolbarHidden={true}
            readOnly={true}
            editorClassName="DraftEditor"
            oneditor_stateChange={this.oneditor_stateChange}
          />
        </div>

        <br />

        <div className="form-group">
          <Link to={"/edit/" + this.state._id}>
            <input
              type="submit"
              value="Edit Document"
              className="btn btn-danger btn-icon-notika waves-effect"
            />
          </Link>
        </div>
      </div>
    );
  }
}
