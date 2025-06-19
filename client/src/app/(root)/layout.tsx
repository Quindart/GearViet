import Header from '@/components/layout/Header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Header />
        {children}
        <div>Footer</div>
    </div>
  )
}

export default Layout