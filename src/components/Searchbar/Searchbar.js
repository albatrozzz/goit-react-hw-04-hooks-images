import { useState } from "react";
import s from './Searchbar.module.css'


export default function Searchbar({onSubmit}){

    const [inputValue, setInputValue] = useState('')

    const onInput = (event) => {
        setInputValue(event.target.value)
    }

    const formSubmit = (event) => {
        event.preventDefault()
        onSubmit(inputValue)
    }

    return(
        <header className= {s.Searchbar}>
            <form className={s.SearchForm} onSubmit = {formSubmit}> 
                <button type="submit" className={s.button} >
                <span className={s.label}>Search</span>
                </button>

                <input
                className={s.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onInput = {onInput}
                value = {inputValue}
                />
            </form>
        </header>
    )

}