import React from 'react'
import './QuestionVotingElem.css'

function QuestionVotingElem(props) {
  return (
    <div>
      <div className="question_container">
        <h3>Вопрос: {props.question.question}</h3>
        <div className="questionItem_container">
        <h4>За</h4><input type='number' placeholder='Введите число'/>
        </div>
        <div className="questionItem_container">
        <h4>Против</h4><input type='number' placeholder='Введите число'/>
        </div>
        <div className="questionItem_container">
        <h4>Воздержался</h4><input type='number' placeholder='Введите число'/>
        </div>
        </div>
    </div>
  )
}

export default QuestionVotingElem