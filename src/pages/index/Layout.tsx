import { Layout } from 'antd'
import React from 'react'

const { Header } = Layout

const LayoutView: React.FC = () => {
  // const header = gradioApp().getElementById('quicksettings')
  const header = document.getElementById('quicksettings')

  return (
    <Layout>
      <Header>{header}</Header>
    </Layout>
  )
}

export default LayoutView
