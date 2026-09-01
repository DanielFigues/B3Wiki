import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import type { SidebarCategory } from '../types/index'

interface LayoutProps {
  siteName: string
  categories: SidebarCategory[]
}

function Layout({ siteName, categories }: LayoutProps) {
  return (
    <div className="layout">
      <Header siteName={siteName} />
      <div className="layout-body">
        <Sidebar categories={categories} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
