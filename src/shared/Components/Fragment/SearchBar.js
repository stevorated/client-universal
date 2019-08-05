import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Nav, Input, Button, Form } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { isMongoId } from 'validator'
import styled from 'styled-components'
import { clearUsersPosts } from '../../Store/actions'
import SearchBarSuggest from './SearchBarSuggest'
import { mediaQueries } from '../../Utils'

function SearchBar({ setRedirect, setWhereTo, clearUsersPosts, handleClick }) {

  const [ pointer, setPointer ] = useState(0)
  const [ keyPress, setKeyPress ] = useState('')
  const [ showSuggest, setShowSuggest ] = useState(false)
  const [ searchTerm , setSearchTerm ] = useState('')
  const [ choices , setChoices ] = useState({})
  
  const handleKeyUps = (e) => {
    switch (e.key) {
      case 'Escape':
        setShowSuggest(false)
        setPointer(0)
        return setKeyPress(e.key)
      case 'ArrowUp':
        pointer > 0 && setPointer(pointer-1)
        return setKeyPress(e.key)
      case 'ArrowDown':
        pointer < choices.length ? setPointer(pointer+1) : null
        return setKeyPress(e.key)
      default:
        break;
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if(!!keyPress) {
      setSearchTerm(e.target.value)
    }
    e.target.value === '' ? setShowSuggest(false) : setShowSuggest(true)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const pointerOrZero = pointer ? pointer : 1
    if(choices.length>0 && isMongoId(choices[pointerOrZero-1].id)) {
      clearUsersPosts()
      setShowSuggest(false)
      setRedirect(true)
      setWhereTo(choices[pointerOrZero-1].id)
      handleClick()
      setSearchTerm('')
      setPointer(0)
      setChoices({})
  }
}
  
  return (
    <Nav className="ml-auto mb-0" navbar>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center mb-0">
          <ReactiveInput  
            onKeyUp={handleKeyUps}
            autoComplete="off"
            value={searchTerm}
            onChange={handleChange}
            name="search"
            placeholder="search ..."
          />
          <SearchButton>
            <FontAwesomeIcon icon={faSearch} />
          </SearchButton>
          </div>
          {showSuggest &&  
            <SearchBarSuggest 
            searchTerm={searchTerm} 
            setShowSuggest={setShowSuggest} 
            setSearchTerm={setSearchTerm} 
            keyPress={keyPress}
            pointer={pointer}
            choices={choices}
            setChoices={setChoices}
            />}
      </Form>
    </Nav>
  )
}

export default connect(undefined, { clearUsersPosts })(SearchBar)

const SearchButton = styled(Button)`
  border-radius: 50%;
  margin-left: 1rem;
  
`

const ReactiveInput = styled(Input)`
  width: 55%;
  ${mediaQueries.xl`
  width: 100%;
  `}
`
