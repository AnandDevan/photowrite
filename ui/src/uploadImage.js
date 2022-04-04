import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

var server = process.env.REACT_APP_SERVER_ADDRESS;

const UploadImage = function (props) {
  let history = useHistory();

  const [file, setFile] = useState(
    null
  );

  function onSelectedFile(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.persist();
    if (file) {
      console.log(file);
      let url = `http://${server}:3001/upload-image`;

      const data = new FormData();
      data.append('file', file)

      axios.post(url, data, {
      })
      .then(res => {
        history.push(`/document/${res.data}`)
        console.warn(res);
      })


    }
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <input type="file" title="Select Image" onChange={e => onSelectedFile(e)} id="fileOpen"></input>
          <input className="btn btn-primary" type="submit" onClick={handleSubmit} id="upload_image" value="Upload"/>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;