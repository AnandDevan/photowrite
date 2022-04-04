
import React from 'react';
import './index.css';
import paper from 'paper';
import axios from 'axios';

import AnnotationText from './annotationText'

import {
  Link,
} from "react-router-dom";

var server = process.env.REACT_APP_SERVER_ADDRESS;

export default class Document extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serverFileUrl: '',
      canvasWidth: 600,
      canvasHeight: 600,
      curItemId: props.match.params.id,
      curItemVersion: -1,
      images: []
    }

    this.state.eventSource = new EventSource(`http://${server}:3001/events/${this.state.curItemId}`);
    this.state.eventSource.addEventListener('message', message => {
      console.log('Got', message);
    });

  }

  componentDidMount() {
    let that = this;
    paper.install(window);
    // window.onload = function() {
      paper.setup('myCanvas');
      var tool = new paper.Tool();
      tool.onMouseDown = function onMouseDown(event) {
        that.state.path = new paper.Path();
        that.state.path.strokeColor = 'blue';
        that.state.path.add(event.point);
        console.log("mouse down")     
      }
      tool.onMouseDrag =  function onMouseDrag(event) {
        if (that.state.path) {
          that.state.path.add(event.point);
        }
      }
      tool.onMouseUp = function onMouseUp(event) {
        console.log("mouse up");
        console.log("num segemnts = " + that.state.path.segments.length);

        that.handleSubmitPath(that.state.path);
      }
    // }
    this.handleLoadImage();

  }

  handleSubmitPath(path) {
    let url = `http://${server}:3001/upload-annotation-path`;
    var postdata = {
      imageUUid: this.state.curItemId,
      path: path.exportJSON()
    }
    console.log("postdata",postdata);

    axios.post(url, postdata, {       
    })
    .then(res => {
      console.warn(res);
    });
  }


  setupSSE() {
    var source = new EventSource(`http://${server}:3001/events/${this.state.curItemId}`);
    var that = this;
    source.addEventListener('message', message => {
      console.log('Got', message);
      if (message.data !== that.state.curItemVersion) {
        this.setState({curItemVersion: message.data});
        that.handleLoadAnnotation(that.state.curItemId);
      }
    });

    if (this.state.eventSource) {
      this.state.eventSource.close();
    }

    this.setState({eventSource: source})
  }

  handleClick() {
    console.log(this.state);
    if (this.raster) {
    }
  }

  handleLoadImage() {
     this.handleLoadImageImpl(this.state.curItemId);
  }

  handleLoadImageImpl(imageUUId) {
    if (imageUUId) {
      this.setState({
        curItemId: imageUUId
      });
      // this._annotationMessage.setState({messages: []});

      console.log(imageUUId);
      var url = `http://${server}:3001/uploads/` + imageUUId + ".png";
      this.setState({ "serverFileUrl": url, "curItemId": imageUUId});
      console.log(this.state.serverFileUrl);
      var raster = new paper.Raster(url);
      this.raster = raster;

      var that = this;

      raster.on('load', function() {
        raster.position = paper.view.center;
        raster.size = new paper.Size(that._canvas.width/paper.view.pixelRatio, that._canvas.height/paper.view.pixelRatio);
      });

      this.setupSSE();

      this.handleLoadAnnotation(imageUUId);
    }
  }

  handleLoadAnnotation(imageUUId) {
    var that = this;
    if (imageUUId) {
      var url = `http://${server}:3001/annotation/${imageUUId}`
      axios.get(url, { // receive two parameter endpoint url ,form data         
      })
      .then(res => { // then print response status
        console.warn(res);
        res.data['annotations'].forEach( function(path) {
          var curPath = paper.Path.importJSON(path);
          curPath.strokeColor = 'blue';
          paper.project._activeLayer.addChild(curPath);
        });

        that.handleLoadAnnotationText(res.data['annotationText']);
      })
    }
  }

  handleLoadAnnotationText(messages) {
    if (messages && this._annotationMessage) {
      this._annotationMessage.setState({messages: messages}) 
    }
  }

  handleSendAnnotationText() {
    if (this.state.curItemId) {

      let url = `http://${server}:3001/upload-annotation-text`;
      var postdata = {
        imageUUid: this.state.curItemId,
        text: this._annotationMessage.state.text
      }
      axios.post(url, postdata, {
      })
      .then(res => {
        console.warn(res);
      })
    }
  }

  handleClickImage(e, item) {
    console.log(e);
    if (item) {
      this.handleLoadImageImpl(item.replace(/\..+$/, ''));
    } else {
      this.handleLoadImageImpl(e.target.textContent.trim().replace(/\..+$/, ''));
    }
  }

  render() {
    return (
      <div className="container-fluid overflow">
        <div> {this.state.eventData} </div>
        <div className="container-fluid" id="container" onClick={() => this.handleClick()}>
          <div className="row">
            <div className="col-3 container-fluid">
              <AnnotationText
                ref={(ref) => this._annotationMessage = ref}
                sendAnnotationText={() => this.handleSendAnnotationText()}
              />
              <Link to="/"> 
                <i className="bi bi-house-fill" style={{"font-size": "1.5rem"}}> Back </i>
              </Link>              
            </div>
            <div className="container-fluid col-9 border border-secondary">
              <canvas 
                id="myCanvas"
                ref={(ref) => this._canvas = ref}>
              </canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
