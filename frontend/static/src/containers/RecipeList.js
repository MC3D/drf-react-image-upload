import React, {Component} from 'react';
import axios from "axios";


class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
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
    let formData = new FormData();

    formData.append('caption', this.state.caption);
    formData.append('image', this.state.image);

    axios.post('/api/v1/boards/', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
        // console.log(res);
        let images = [...this.state.images];
        images.push(res.data);
        this.setState({images});
    })
    .catch(error => {
        console.log(error);
    });
  }

  componentDidMount() {
     axios.get(`/api/v1/boards/`)
     .then(res => {
         console.log(res);
         this.setState({images: res.data});
     })
     .catch(error => {
         console.log(error);
     });
   }

  render() {
    let images = this.state.images.map(image => (
      <li key={image.id}>
        <p>{image.caption}</p>
        <p>{image.created_by.username}</p>
        <img src={image.image} alt='' />
      </li>
    ))
    return  (
      <ul>{images}</ul>
    )
  }
}

export default RecipeList;
