import React from "react"
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import Avatar from "../../../assets/logos/new_logo.png"
const imgAvatar = Avatar.replace("build", "").replace("/public", "")
import { BigProfileImg } from "../../Elements"
import { black } from "../../Utils"


export default function EventGoingItem(props) {
  // console.log(props)
  const {id, avatar, fname, lname} = props.follower
  return (
    <Col className="d-flex" xs={3}>
    <Link
    style={{
      color: black
    }}
    to={`/profile/${id}`}
    >


      <div className="mt-1 text-center">
        <BigProfileImg
          className="text-center"
          src={avatar ? `${process.env.API_BASE}${avatar.url}` : imgAvatar}
          alt={`${fname} ${lname}`}
          />
        <div className="text-center">
          {fname} {lname}
        </div>
      </div>
    </Link>
    </Col>
  )
}
