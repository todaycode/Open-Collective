import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import fetch from 'isomorphic-fetch';
import { imagePreview } from '../lib/utils';
import { upload } from '../lib/api';

class InputTypeDropzone extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: props.defaultValue, url: props.defaultValue }; // value can be base64 encoded after upload, url is always an url
  }

  handleChange(files) {
<<<<<<< HEAD
=======
    // for e2e testing purposes
    if (window.location.hostname === 'localhost') {
      const fileUrl = "https://d.pr/free/i/OlQVIb+";
      this.setState({ url: fileUrl });
      return this.props.onChange(fileUrl);
    }

>>>>>>> 8ec6162... limit number of payment methods to fetch per collective + other fixes
    const file = files[0];
<<<<<<< HEAD
    upload(file)
      .then(fileUrl => {
        this.setState({ url: fileUrl });
        return this.props.onChange(fileUrl);
      })
      .catch(err => {
        console.error(">>> error uploading image", file, err);
        this.setState({ error: "error uploading image, please try again" });
      });
=======
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ value: e.target.result })
    }
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    // for e2e testing purposes
    if (window.location.hostname === 'localhost') {
      return this.props.onChange(`http://${window.location.host}/static/images/receipt.svg`);
    }
    fetch('/api/images', {
      method: 'post',
      headers: this.addAuthTokenToHeader(),
      body: formData,
    })
    .then(this.checkStatus)
    .then(json => {
      console.log(">>> upload response", json);
      this.setState({ url: json.url });
      return this.props.onChange(json.url);
    })
    .catch(err => {
      console.error(">>> error uploading image", file, err);
      this.setState({ error: "error uploading image, please try again" });
    });
>>>>>>> 296c2a8... fixing e2e tests
  }

  render() {

    const options = this.props.options || {};
    options.accept = options.accept || 'image/png, image/jpeg';

    return (
      <div className={`InputTypeDropzone ${this.props.className}`}>
        <style jsx global>{`
          .dropzone {
            border: 2px dashed transparent;
            position: relative;
            min-height: 80px;
          }
          .dropzone .placeholder {
            position:absolute;
            font-size: 1rem;
            text-align: center;
            display: none;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.4);
          }
          .dropzone:hover, .dropzone.empty {
            border: 2px dashed grey;
          }
          .dropzone:hover .placeholder, .dropzone.empty .placeholder {
            display: flex;
          }
        `}</style>
        <Dropzone
          multiple={false}
          onDrop={this.handleChange}
          placeholder={this.props.placeholder}
          className={`${this.props.name}-dropzone dropzone ${!this.state.value && 'empty'}`}
          style={{}}
          {...options}
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return "This file is authorized";
            }
            if (isDragReject) {
              return "This file is not authorized";
            }
            if (this.state.error) {
              return this.state.error;
            }
            return (
              <div>
                <div className="placeholder">Drop an image or click to upload</div>
                <img className="preview" src={imagePreview(this.state.url, 128)} />
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default InputTypeDropzone;