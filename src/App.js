import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (searchQuery === ''){
      return
    }
    setShowLoading(true)
    api.searchQuery(searchQuery, pageNumber).then(response => {
      setTotalPages(Math.ceil(response.total / response.hits.length))
      const newPictures = searchResults.concat(response.hits)
      if (pageNumber === totalPages){
        setTotalPages(null)
      }
      setSearchResults(newPictures)
      setShowLoading(false)
    }).catch(error => console.log(error))
    // eslint-disable-next-line
  }, [searchQuery, pageNumber])

const onSubmitForm = (query) => {
  setSearchQuery(query)
  setPageNumber(1)
  setSearchResults([])
  setTotalPages(null)
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
        <Searchbar onSubmit = {onSubmitForm}/>
        <ImageGallery onClick = {renderModalImage}>
          <ImageGalleryItem array = {searchResults} />
        </ImageGallery>
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          visible={showLoading}
        />
        {totalPages && <Button onClick = {loadMoreImages}/>}
        {showModal && <Modal image = {modalImage} closeModal = {closeModal}/>}
      </div>
    )
}

export default App;
