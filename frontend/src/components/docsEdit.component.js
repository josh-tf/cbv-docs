import React, { Component } from "react";
import axios from "axios";
import DocumentTitle from "react-document-title";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles.css";

export default class DocsEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeDocTitle = this.onChangeDocTitle.bind(this);
    this.onChangeDocSlug = this.onChangeDocSlug.bind(this);
    this.onChangeDocLastEdited = this.onChangeDocLastEdited.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      doc_title: "",
      doc_contents: "",
      editorState: "",
      doc_slug: "",
      doc_last_edited: ""
    };
  }
  // state change methods
  onChangeDocTitle(e) {
    this.setState({
      doc_title: e.target.value
    });
  }

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState: editorState,
      doc_contents: JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      )
    });
    console.log(this.state.doc_contents);
  };

  onChangeDocContents(e) {
    this.setState({
      doc_contents: e.target.value
    });
  }

  onChangeDocSlug(e) {
    this.setState({
      doc_slug: e.target.value
    });
  }

  // needs rework, this is auto generated
  onChangeDocLastEdited(e) {
    this.setState({
      doc_last_edited: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      doc_title: this.state.doc_title,
      doc_contents: this.state.doc_contents,
      doc_slug: this.state.doc_slug,
      doc_last_edited: "" //this.state.doc_last_edited
    };
    axios
      .post(
        "https://cbv-docs-backend.herokuapp.com/docs/update/" +
          this.props.match.params.id,
        obj
      )
      .then(response => {
        this.props.upList();
      });

    this.props.history.push("/");
  }

  componentDidMount() {
    axios
      .get(
        "https://cbv-docs-backend.herokuapp.com/docs/" +
          this.props.match.params.id
      )
      .then(response => {
        var json = JSON.parse(response.data.doc_contents);
        var contentState = convertFromRaw(json);

        this.setState({
          doc_title: response.data.doc_title,
          //editorState: stateFromHTML(response.data.doc_contents),
          editorState: EditorState.createWithContent(contentState),
          doc_slug: response.data.doc_slug,
          doc_last_edited: response.data.doc_last_edited
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <DocumentTitle title="Computerbank Docs: Edit Document" />

        <div class="basic-tb-hd">
          <h2>Edit Document</h2>
          <p>
            Edit the contents of an existing document, if the slug is changed
            then this will be updated wherever it is referenced.
          </p>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group float-lb">
            <label>Title</label>
            <div class="nk-int-st">
              <input
                type="text"
                className="form-control"
                value={this.state.doc_title}
                onChange={this.onChangeDocTitle}
              />
            </div>
          </div>
          <div className="form-group nk-int-st">
            <label>Slug</label>
            <input
              type="text"
              className="form-control input-sm"
              value={this.state.doc_slug}
              onChange={this.onChangeDocSlug}
            />
          </div>
          <div className="form-group">
            <label>Contents</label> <br /> <br />
            <Editor
              editorState={editorState}
              editorClassName="DraftEditor"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Save Document"
              className="btn btn-default btn-icon-notika waves-effect"
            />
          </div>
        </form>
      </div>
    );
  }
}
