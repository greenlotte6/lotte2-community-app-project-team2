import React from 'react'
import { Driveside } from '../../components/Drive/Driveside'
import { Drivemain } from '../../components/Drive/Drivemain'
import { MainLayout } from '../../layouts/MainLayout'

export const Drivepage = () => {
   return (
      <MainLayout>
        <section className="drive-main">
          <div className="content-layout">
          <Driveside/>
          <Drivemain/>
          </div>
        </section>
      </MainLayout>
    )
}
