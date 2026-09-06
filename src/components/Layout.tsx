import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import Header from './Header'
import Sidebar from './Sidebar'
import { useWiki } from '../store/index'

const SIDEBAR_STORAGE_KEY = 'b3wiki:sidebarCollapsed'

function Layout() {
  const { config } = useWiki()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarCollapsed ? '1' : '0')
    } catch {
      // sem ação: armazenamento indisponível não pode derrubar o app
    }
  }, [sidebarCollapsed])

  return (
    <div className="relative isolate min-h-svh bg-paper font-sans text-ink">
      <AnimatedBackground />
      <Header
        siteName={config.name}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="relative flex">
        {!isLanding && <Sidebar collapsed={sidebarCollapsed} />}
        <main className={`min-w-0 flex-1 ${isLanding ? 'p-0' : 'px-6 pb-6 pt-16'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout