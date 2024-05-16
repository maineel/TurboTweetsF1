import React from 'react'
import { useParams } from 'react-router-dom'

function Profile() {
    const {profileid} = useParams()
  return (
    <div className='text-white'>Profile: {profileid}</div>
  )
}

export default Profile