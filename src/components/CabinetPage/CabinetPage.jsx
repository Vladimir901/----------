import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'

function CabinetPage() {

    const {id} = useParams()

  return (
    <div>
      <Header fio={'Председателев П.П.'} snt={'СНТ1'}/>
      CabinetPage
      </div>
  )
}

export default CabinetPage