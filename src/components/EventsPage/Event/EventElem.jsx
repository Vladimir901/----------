import React from 'react'
import './EventElem.css'

function EventElem(props) {
  return (
    <div className="eventElem">
        <h5>{props.event.text}</h5>
        <div className="inline_info">
        <h6>{props.event.datetime}</h6>
        <h6>{props.event.place}</h6>
        </div>
    </div>
  )
}

export default EventElem