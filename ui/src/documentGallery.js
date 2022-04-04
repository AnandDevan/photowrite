import React from 'react';
import axios from 'axios';
import Image from './image';

var server = process.env.REACT_APP_SERVER_ADDRESS;

export default class DocumentGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }

    this.downloadImages();
  }

  downloadImages() {
    var url = `http://${server}:3001/images`;
    axios.get(url, {         
    })
    .then(res => {
      this.setState({
        images: res.data
      });
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className="container-fluid" id="gallery">
              <div className="row">
                {
                  this.state.images.map((item, idx) => {
                    return <Image key={idx} id={item}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
