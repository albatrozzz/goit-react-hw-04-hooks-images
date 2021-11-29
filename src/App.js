import { useState } from 'react';
import Loader from "react-loader-spinner"
import s from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import api from './servises/api/api';

function App(){
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [modalImage, setModalImage] = useState([])
  const [showLoading, setShowLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)


// onSubmitForm = (searchQuery) => {
//   const startPage = 1

//   this.setState({
//     searchQuery,
//     searchResults: [],
//     pageNumber: startPage,
//     totalPages: null
//   })
//   this.findImages(searchQuery, startPage)
//   }

  const findImages = async (query, currentPage) => {
    setShowLoading(true)
    const response = await api.searchQuery(query, currentPage)
    setTotalPages(Math.ceil(response.total / response.hits.length))
    const newPictures = searchResults.concat(response.hits)
    if (currentPage === totalPages){
      setTotalPages(null)
    }
    setSearchResults(newPictures)
    setShowLoading(false)
  }

  const loadMoreImages = () => {
    setPageNumber(prev => prev + 1)
  }

  const renderModalImage = (event) => {
    const elemNumber = searchResults.map(item => {
      return item.id
    }).indexOf(Number(event.target.id))
    const elem = searchResults[elemNumber]
    setModalImage(elem)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    }
  
    return(
      <div className = {s.App}> 
        <Searchbar onSubmit = {this.onSubmitForm}/>
        <ImageGallery onClick = {renderModalImage}>
          <ImageGalleryItem array = {this.state.searchResults} />
        </ImageGallery>
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          visible={this.state.showLoading}
        />
        {totalPages && <Button onClick = {loadMoreImages}/>}
        {showModal && <Modal image = {modalImage} closeModal = {closeModal}/>}
      </div>
    )
}

export default App;
