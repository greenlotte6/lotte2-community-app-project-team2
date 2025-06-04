import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Calendermain } from '../../components/Calendar/Calendermain'
import { Calenderside } from '../../components/Calendar/Calenderside'

export const Calenderpage = () => {
  return (
    <MainLayout>
      <section className='calender-main'>
        <div className='content-layout'>
          <Calenderside/>
          <Calendermain/>
        </div>
      </section>
    </MainLayout>
  )
}
