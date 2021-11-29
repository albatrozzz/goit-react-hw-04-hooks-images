import { Component } from 'react'
import { createPortal } from "react-dom"
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component{

componentDidMount(){
    window.addEventListener('keydown', this.closeModal)
}

componentWillUnmount(){
    window.removeEventListener('keydown', this.closeModal)
}

overlayClick = (event) => {
    if (event.target === event.currentTarget){
        this.props.closeModal()
    }
}

closeModal = (event) => {
    if (event.code === 'Escape'){
        this.props.closeModal()
    }
}

render(){
    return createPortal(
        <div className={s.Overlay} onClick = {this.overlayClick}>
            <div className={s.Modal} >
                <img src={this.props.image.largeImageURL} alt={this.props.image.tags} />
            </div>
        </div>, modalRoot
    )
}

}
