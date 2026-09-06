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
      {isLanding && (
        <Header
          siteName={config.name}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        />
      )}
      <div className="relative flex min-h-svh">
        {!isLanding && <Sidebar collapsed={sidebarCollapsed} />}
        <main className="min-w-0 flex-1">
          {!isLanding && (
            <Header
              siteName={config.name}
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
            />
          )}
          <div className={isLanding ? 'p-0' : 'px-6 pb-6'}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout