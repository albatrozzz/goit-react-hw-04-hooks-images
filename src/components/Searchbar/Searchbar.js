import { Component } from "react";
import s from './Searchbar.module.css'


export default class Searchbar extends Component{
state = {
    inputValue: '',
}

onInput = (event) => {
    this.setState({inputValue: event.target.value})
}

onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.inputValue)
    this.setState({inputValue: ''})
}


    render(){
        return(
            <header className= {s.Searchbar}>
                <form className={s.SearchForm} onSubmit = {this.onSubmit}>
                    <button type="submit" className={s.button} >
                    <span className={s.label}>Search</span>
                    </button>
    
                    <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onInput = {this.onInput}
                    value = {this.state.inputValue}
                    />
                </form>
            </header>
        )
    }
}