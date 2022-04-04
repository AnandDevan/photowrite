import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Document from './document';
import DocumentGallery from './documentGallery';
import UploadImage from './uploadImage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// var server = process.env.REACT_APP_SERVER_ADDRESS;

class DocumentAnnotationApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <DocumentGallery/>
            <UploadImage/>
          </Route>
          <Route path="/document/:id" component={Document}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <DocumentAnnotationApp />,
  document.getElementById('root')
);
