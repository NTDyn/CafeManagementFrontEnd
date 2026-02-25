import React from 'react'
import Navbar from '../../../components/client/Navbar/Navbar'
import Footer from '../../../components/client/footer'
import MainChat from '../../../components/client/authorize/user/chat/index.js'

function Chat() {
  const status = {
    Home: "",
  }
  return (
    <>
      <Navbar status={status} />
      <MainChat />
      <Footer />
    </>
  )
}

export default Chat