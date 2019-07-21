import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmallLoading , Posts } from '..'
import { Query } from 'react-apollo'
import { SEARCH_USER } from '../../Store/Apollo/Queries'
import { clearUsersPosts, clearUsersPostsAndRefetch } from '../../Store/actions'
import styled from 'styled-components'
import { black, ceruleam, mediaQs } from '../../Utils'

function SearchBarSuggest(props) {
  const handleClick = (e) => {
    props.setShowSuggest(false)
    props.setSearchTerm(e.target.text)
    
    if(props.choices && props.choices.length ) {
      const fullName = `${props.choices[props.pointer].fname} ${props.choices[props.pointer].lname}`
      if(fullName !== e.target.text) {
        props.clearUsersPostsAndRefetch(props.choices[props.pointer].id)
      }
    }
    
  }
  return (
    <Query
    fetchPolicy='network-only' // IMPORTANT
    query={SEARCH_USER}
    variables={{ 
      username: props.searchTerm,
      fname: props.searchTerm.split(' ')[0],
      lname: props.searchTerm.split(' ').length > 1 ? props.searchTerm.split(' ')[1] : props.searchTerm.split(' ')[0]
     }}
    >
    {({ loading, error, data }) => {
      
      if(error) return ''
      let count = 0
      props.setChoices(data.searchUsers)
      return (
        <FlyingSuggest className="text-left">
          <SuggestList>
            {data.searchUsers && data.searchUsers.map((user)=> {
              count ++ 
              return (
                <Suggestion 
                key={user.id} 
                pointer={props.pointer}
                className={`suggestion_${count}`}>
                  <SuggestLink 
                  id={user.id} 
                  onClick={handleClick} 
                  to={`/profile/${user.id}`} 
                  >
                  {`${user.fname} ${user.lname}`}
                  </SuggestLink>
                </Suggestion>
                )
            })}
            {loading && !!data.searchUsers && data.searchUsers.length === 0 && <Suggestion><SmallLoading /></Suggestion>  }
          </SuggestList>  
        </FlyingSuggest>
      );
    }}
  </Query>
  )
}

const mapStateToProps = ({ profilePosts}) => {
  return {profilePosts}
}
export default connect(mapStateToProps, { clearUsersPosts, clearUsersPostsAndRefetch })(SearchBarSuggest)


const FlyingSuggest = styled.div `
  /* padding: 0 3rem 0 0rem; */
  position: absolute;
  top: 2.8rem;
  background: white;
  text-align: left;
  border-radius: 0rem 0rem .3rem .3rem;
  width: 11.6rem;
  ${mediaQs.mamabear `
    position: static!important;
    min-width: 80vw;
  `}
`

const Suggestion = styled.div`
background: ${(props) => {
  if(`suggestion_${props.pointer}` === props.className) {
    return `rgb(199, 212, 206)`
  }
}};
  &:hover {
    background: rgb(199, 212, 206);
  }
  ${mediaQs.mamabear `
  `}
`
const SuggestList = styled.div`
`
const SuggestLink = styled(Link)`
  font-size: 1.1rem;
  display: block;
  color: ${black};
  ${mediaQs.mamabear `
  
  `}
  &:hover {
    text-decoration: none;
  }
  /* max-width: 76vw; */
`