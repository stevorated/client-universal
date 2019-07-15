import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { Container } from 'reactstrap'
import routes from './mainRoutes'

export const MainContent = ({ whereTo, redirect, setRedirect }) => {
  const id = whereTo
  if(redirect) {
    setRedirect(false)
    return <Redirect to={`/profile/${id}`} />
  }
  return(
  <Container fluid>{renderRoutes(routes)}</Container>
)}