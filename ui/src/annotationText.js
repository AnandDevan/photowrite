import React from 'react';

// var server = process.env.REACT_APP_SERVER_ADDRESS;

export default class AnnotationText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      messages: ['loading..']
    }
  }
  
  onSendMessage(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      this.props.sendAnnotationText();
    }
  }

  render() {
    return (
      <div className="border border-primary messages-panel">
          <div className="input-group">
            <textarea className="form-control message-input" type="text" title="Send Message"  onKeyPress={e => this.handleKeyPress(e)} onChange={e => this.onSendMessage(e)}></textarea>           
            <input className="input-group-append bi bi-caret-right-fill" type="submit" onClick={this.props.sendAnnotationText} name="btn_upload_profile_pic" value="Send"/>
          </div>
          <ul className="overflow-auto message-height messages-panel">
            {this.state.messages.slice(0).reverse().map((item, idx) => {
              return <li className="messages-panel list-group-item message-item" key={idx}> > {item} </li>
            })}
          </ul>
      </div>
    );
  }
}
