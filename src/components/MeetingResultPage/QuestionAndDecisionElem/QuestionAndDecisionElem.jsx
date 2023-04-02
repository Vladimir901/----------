import React from 'react'
import './QuestionAndDecisionElem.css'

function QuestionAndDecisionElem(props) {
  return (
    <div>
      <h2>{props.elem.id+". "+props.elem.question}</h2>
    </div>
  )
}

export default QuestionAndDecisionElem