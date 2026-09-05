import { Outlet } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import Header from './Header'
import Sidebar from './Sidebar'
import { useWiki } from '../store/index'

function Layout() {
  const { config } = useWiki()

  return (
    <div className="relative isolate min-h-svh bg-paper font-sans text-ink">
      <AnimatedBackground />
      <Header siteName={config.name} />
      <div className="relative flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout