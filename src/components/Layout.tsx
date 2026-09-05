import { Outlet, useLocation } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import Header from './Header'
import Sidebar from './Sidebar'
import { useWiki } from '../store/index'

function Layout() {
  const { config } = useWiki()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <div className="relative isolate min-h-svh bg-paper font-sans text-ink">
      <AnimatedBackground />
      <Header siteName={config.name} />
      <div className="relative flex">
        {!isLanding && <Sidebar />}
        <main className={`min-w-0 flex-1 ${isLanding ? 'p-0' : 'px-6 py-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout