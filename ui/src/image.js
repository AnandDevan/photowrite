import React from 'react';
import {
  Link
} from "react-router-dom";



var server = process.env.REACT_APP_SERVER_ADDRESS;

export default class Image extends React.Component {

  render() {
    var url = `http://${server}:3001/uploads/` + this.props.id + '.png';
    return (
      <div className="col-3 border border-secondary">
	    	<Link to={`/document/${this.props.id}`}>
		        <img onClick={this.props.onClick} src={url} alt={url} className="img-fluid"/>
		    </Link>
	    </div>
    );
  }
}
