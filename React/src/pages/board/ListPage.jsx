import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { Article_Wrapper } from '../../components/board/list/Article_Wrapper'
import { Article_Wrapper } from '../../components/board/common/Title'

const ListPage = () => {
  return (
    <MainLayout>
          <section>
            <div>
              <Title/>
              <Article_Wrapper/>
            </div>
          </section>
    </MainLayout>
  )
}

export default ListPage
