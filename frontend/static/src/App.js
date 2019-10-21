import React, {Component} from 'react';
import axios from "axios";
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: '',
      image: null,
      preview: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImageChange(e) {
    // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
    let file = e.target.files[0];
    // we'll use this value when we save the image (see _saveImage)
    this.setState({image: file});
    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    let reader = new FileReader();
    // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    }
    // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form_data = new FormData();

    form_data.append('caption', this.state.caption);
    form_data.append('image', this.state.image);

    axios.post('/api/v1/boards/', form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });
  }

  componentDidMount() {
     axios.get(`/api/v1/boards/`)
     .then(res => {
         console.log(res);
     })
     .catch(error => {
         console.log(error);
     });
   }

  render() {
    return  (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='caption' value={this.state.caption} onChange={this.handleChange}/>
        <input type = "file" name='image' onChange = {this.handleImageChange}/>
        {this.state.image ? (
          <img src={this.state.preview} alt='preview'/>
        ) : (
          null
        )}
        <button>Upload</button>
      </form>
    )
  }
}

export default App;
