import React from 'react'
import Navbar from '../../../components/client/Navbar/Navbar'
import Footer from '../../../components/client/footer'
import MainProfile from '../../../components/client/authorize/user/profile'

function Profile() {
  // status navbar
  const status = ''
  return (
    <>
      <Navbar status={status} />
      <MainProfile />
      <Footer />
    </>
  )
}

export default Profile