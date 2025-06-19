import React, { useState } from 'react'
import { Messengerside } from '../../components/Messenger/Messengerside'
import { Messengermain } from '../../components/Messenger/Messengermain'
import { MainLayout } from '../../layouts/MainLayout'

export const Messengerpage = () => {
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <MainLayout>
      <section className="messenger-main">
        <div className="content-layout">
          <Messengerside currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
          {currentRoom && <Messengermain currentRoom={currentRoom} />}
        </div>
      </section>
    </MainLayout>
  );
}
