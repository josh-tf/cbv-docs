import React, { Component } from "react";
import axios from "axios";
import DocumentTitle from "react-document-title";
import { editor_state, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class DocsCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeDocTitle = this.onChangeDocTitle.bind(this);
    this.onChangeDocSlug = this.onChangeDocSlug.bind(this);
    this.onChangeDocLastEdited = this.onChangeDocLastEdited.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      doc_title: "",
      doc_contents: "",
      editor_state: editor_state.createEmpty(),
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

  oneditor_stateChange: Function = editor_state => {
    console.log(editor_state);
    //console.log(convertToRaw(editor_state.getCurrentContent()))
    this.setState({
      editor_state: editor_state,
      doc_contents: JSON.stringify(
        convertToRaw(editor_state.getCurrentContent())
      )
    });
  };

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

    console.log(`Form submitted:`);
    console.log(`Doc Title: ${this.state.doc_title}`);
    console.log(`Doc Contents: ${this.state.doc_contents}`);
    console.log(`Doc Slug: ${this.state.doc_slug}`);

    const newDoc = {
      doc_title: this.state.doc_title,
      doc_contents: this.state.doc_contents,
      doc_slug: this.state.doc_slug,
      doc_last_edited: "" //this.state.doc_last_edited
    };

    axios
      .post("https://cbv-docs-backend.herokuapp.com/docs/add", newDoc)
      .then(response => {
        this.props.upList();
      });

    this.setState({
      doc_title: "",
      doc_contents: "",
      editor_state: editor_state.createEmpty(),
      doc_slug: "",
      doc_last_edited: ""
    });

    this.props.history.push("/");
  }

  render() {
    const { editor_state } = this.state;
    return (
      <div style={{ marginTop: 10 }}>
        <DocumentTitle title="Computerbank Docs: Add new Document" />

        <div class="basic-tb-hd">
          <h2>Create New Document</h2>
          <p>
            The slug is the page url, spaces will be replaced with dashes,
            examples include <code>cbv-pos-sales</code> or{" "}
            <code>front-desk</code>.
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
              editorState={editor_state}
              editorClassName="DraftEditor"
              oneditor_stateChange={this.oneditor_stateChange}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create New Document"
              className="btn btn-default btn-icon-notika waves-effect"
            />
          </div>
        </form>
      </div>
    );
  }
}
