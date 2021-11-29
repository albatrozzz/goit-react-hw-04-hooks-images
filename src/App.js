import { Component } from 'react';
import Loader from "react-loader-spinner"
import s from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import api from './servises/api/api';

class App extends Component {
state={
  searchQuery: '',
  searchResults: [],
  pageNumber: 1,
  totalPages: null,
  showModal: false,
  modalImage: [],
  showLoading: false
}

onSubmitForm = (searchQuery) => {
  const startPage = 1

  this.setState({
    searchQuery,
    searchResults: [],
    pageNumber: startPage,
    totalPages: null
  })
  this.findImages(searchQuery, startPage)
  }

  findImages = async (query, currentPage) => {
    this.setState({
      showLoading: true
    })
    const response = await api.searchQuery(query, currentPage)
    let totalPages = Math.ceil(response.total / response.hits.length)
    const newPictures = this.state.searchResults.concat(response.hits)
    if (currentPage === this.state.totalPages){
      totalPages = null
    }
    this.setState({
      searchResults: newPictures,
      totalPages,
      showLoading: false
    })
  }

loadMoreImages = () => {
  const nextPage = this.state.pageNumber + 1
  this.setState({
    pageNumber: nextPage
  })

  this.findImages(this.state.searchQuery, nextPage)
}

renderModalImage = (event) => {
  const elemNumber = this.state.searchResults.map(item => {
    return item.id
  }).indexOf(Number(event.target.id))
  const elem = this.state.searchResults[elemNumber]
  this.setState({
    modalImage: elem,
    showModal: true
  })
}

closeModal = () => {
  this.setState({
    showModal: false
  })
}

  render(){
    return(
      <div className = {s.App}> 
        <Searchbar onSubmit = {this.onSubmitForm}/>
        <ImageGallery onClick = {this.renderModalImage}>
          <ImageGalleryItem array = {this.state.searchResults} />
        </ImageGallery>
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          visible={this.state.showLoading}
        />
        {this.state.totalPages && <Button onClick = {this.loadMoreImages}/>}
        {this.state.showModal && <Modal image = {this.state.modalImage} closeModal = {this.closeModal}/>}
      </div>
    )
  };
}

export default App;
