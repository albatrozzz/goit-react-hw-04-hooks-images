import PropTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({array}){
    console.log(array)
    return array.map(item => {
        return (
            <li className={s.ImageGalleryItem} key = {item.id} >
                <img src={item.previewURL} alt={item.tags} id = {item.id} className = {s.image}/>
            </li>
        )
    })
}

ImageGalleryItem.propTypes = {
    array: PropTypes.array
}