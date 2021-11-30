import { useEffect } from 'react'
import { createPortal } from "react-dom"
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ image, closeModal}){

    useEffect(() => {
        window.addEventListener('keydown', onCloseModal)

        return () =>{
            window.removeEventListener('keydown', onCloseModal)
        }
    })


    const overlayClick = (event) => {
        if (event.target === event.currentTarget){
            closeModal()
        }
    }

    const onCloseModal = (event) => {
        if (event.code === 'Escape'){
            closeModal()
        }
    }

    return createPortal(
        <div className={s.Overlay} onClick = {overlayClick}>
            <div className={s.Modal} >
                <img src={image.largeImageURL} alt={image.tags} />
            </div>
        </div>, modalRoot
    )
}
