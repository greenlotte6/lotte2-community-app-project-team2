import React, { useState } from 'react'
import { Messengerside } from '../../components/Messenger/Messengerside'
import { Messengermain } from '../../components/Messenger/Messengermain'
import { MainLayout } from '../../layouts/MainLayout'

export const Messengerpage = () => {
  const [currentRoom, setCurrentRoom] = useState('채팅 1');

  return (
    <MainLayout>
      <section className="messenger-main">
        <div className="content-layout">
          <Messengerside currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
          <Messengermain currentRoom={currentRoom} />
        </div>
      </section>
    </MainLayout>
  )
}