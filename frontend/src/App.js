// need to start somewhere
import React, { Component } from "react";

// react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// page components
import DocsList from "./components/docsList.component";
import DocsEdit from "./components/docsEdit.component";
import DocsCreate from "./components/docsCreate.component";
import DocsView from "./components/docsView.component";
import DocsDelete from "./components/docsDelete.component";

// axios for http requests
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: [] };
  }

  componentDidMount() {
    axios
      .get("https://cbv-docs-backend.herokuapp.com/docs/")
      .then(response => {
        this.setState({
          docs: response.data
        });

        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateList() {
    axios
      .get("https://cbv-docs-backend.herokuapp.com/docs/")
      .then(response => {
        this.setState(
          {
            docs: response.data
          },
        );

        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.docs);
    return (
      <Router>
        <div class="header-top-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="logo-area">
                  <Link to="/" className="nav-link">
                    <img src="img/logo/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div class="header-top-menu">
                  <ul class="nav navbar-nav notika-top-nav">
                    <li class="nav-item">
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li class="nav-item">
                      <a href="#" role="button" class="nav-link">
                        <span>Topics</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <Link to="/" className="nav-link">
                        View All
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/create" className="nav-link">
                        Add New
                      </Link>
                    </li>

                    <li class="nav-item dropdown">
                      <a
                        href="#"
                        data-toggle="dropdown"
                        role="button"
                        aria-expanded="false"
                        class="nav-link dropdown-toggle"
                      >
                        <span>
                          <i class="notika-icon notika-search" />
                        </span>
                      </a>
                      <div
                        role="menu"
                        class="dropdown-menu search-dd animated flipInX"
                      >
                        <div class="search-input">
                          <i class="notika-icon notika-left-arrow" />
                          <input type="text" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="main-menu-area mg-tb-40" />

        <div class="breadcomb-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="breadcomb-list">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div class="breadcomb-wp">
                        <div class="breadcomb-icon">
                          <i class="notika-icon notika-file" />
                        </div>
                        <div class="breadcomb-ctn">
                          <h2>Knowledgebase</h2>
                          <p>
                            Welcome to the Computerbank{" "}
                            <span class="bread-ntd">documentation tool</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-3">
                      <div class="breadcomb-report">
                        <button
                          data-toggle="tooltip"
                          data-placement="left"
                          title="Download Report"
                          class="btn"
                        >
                          <i class="notika-icon notika-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="typography-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="typography-list typography-mgn">
                  <Route
                    path="/edit/:id"
                    render={props => (
                      <DocsEdit
                        upList={this.updateList.bind(this)}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path="/delete/:id"
                    render={props => (
                      <DocsDelete
                        upList={this.updateList.bind(this)}
                        {...props}
                      />
                    )}
                  />

                  <Route
                    path="/create"
                    render={props => (
                      <DocsCreate
                        upList={this.updateList.bind(this)}
                        {...props}
                      />
                    )}
                  />

                  <Route path="/view/:slug" component={DocsView} />

                  <Route
                    path="/"
                    exact
                    render={() => <DocsList docArr={this.state.docs} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
