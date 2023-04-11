import React, { useEffect } from 'react'
import './VotingUserPage.css'
import Header from '../Header/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function VotingUserPage() {
  const { id } = useParams()
  useEffect(()=>{
    // axios.get('')
  },[])
  return (
    <div>
      <Header/>
    <div className="main_container_user">
        <div className="container_user">
          
        </div>
    </div>
    </div>
  )
}

export default VotingUserPage