import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FlatCard } from '../../Elements'
import { black } from '../../Utils'
export default function FeedActivity() {
  return (
    <div className="p-1">
      <FlatCard className="grow-on-hover noPadding">
        <StyledLink to="/" className="small-text-header mt-1 ml-3">Today, 7:00pm, levontin 7 the XXXXX & YYYY's</StyledLink>
      </FlatCard>
    </div>

  )
}

const StyledLink = styled(Link)`
  display: block;
  padding: .8rem;
  color: ${black};
  &:hover {
    color: ${black};
    text-decoration: none;
  }
`