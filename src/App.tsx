import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/index'
import { Home, ArticleView, Editor } from './pages/index'
import type { SidebarCategory } from './types/index'

const siteName = 'B3Wiki'

const categories: SidebarCategory[] = [
  {
    title: 'Main',
    links: [
      { slug: 'home', title: 'Home', url: '/' },
      { slug: 'example', title: 'Example Article', url: '/wiki/example' },
    ],
  },
  {
    title: 'Community',
    links: [
      { slug: 'rules', title: 'Rules', url: '/wiki/rules' },
      { slug: 'members', title: 'Members', url: '/wiki/members' },
    ],
  },
]

function App() {
  return (
    <Routes>
      <Route
        element={<Layout siteName={siteName} categories={categories} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/wiki/:slug" element={<ArticleView />} />
        <Route path="/editor" element={<Editor />} />
      </Route>
    </Routes>
  )
}

export default App
