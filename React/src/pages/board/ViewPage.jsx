import React from 'react'
import { Article_Wrapper } from '../../components/board/view/Article_Wrapper'

export const ViewPage = () => {
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
