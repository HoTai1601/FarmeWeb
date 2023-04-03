import React, { useRef } from 'react'
import { useHistory  } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SearchForm = () => {
    const inputRef = useRef()
    const history = useHistory()
    const handleSubmit = (e) =>{
        e.preventDefault();
        const value = inputRef.current.value;
        if(!value.trim()){
            alert("Không được để trống");
        } else{
            return history.push(`/search/${value}`)
        }
    }
  return (
        <form onSubmit={handleSubmit}>
            <InputGroup className="nav-search" >
        <Form.Control 
              placeholder="Bạn cần gì ..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              ref={inputRef}
            />
        <Button type='submit' className="nav-btn" variant="outline-secondary" >
            <i className="fas fa-search"></i>
        </Button>
        </InputGroup>
        </form>
)}

export default SearchForm