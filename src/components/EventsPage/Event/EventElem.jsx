import React from 'react'
import './EventElem.css'
import { Link } from 'react-router-dom'

function EventElem(props) {
  return (
    <div>
      <Link to={props.event.link? props.event.link: ''} className='linkToPage'>
    <div className="eventElem">
        <h5>{props.event.text}</h5>
        <div className="inline_info">
        <h6>{props.event.datetime}</h6>
        <h6>{props.event.place}</h6>
        </div>
    </div>
    </Link>
    </div>
  )
}

export default EventElem