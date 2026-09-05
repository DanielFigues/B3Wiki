import { Route, Routes } from 'react-router-dom'
import { WikiProvider } from './store/index'
import { Layout } from './components/index'
import { ArticleView, CategoryPage, Editor, Home, SearchPage } from './pages/index'

function App() {
  return (
    <WikiProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wiki/:slug" element={<ArticleView />} />
          <Route path="/categoria/:categoria" element={<CategoryPage />} />
          <Route path="/busca" element={<SearchPage />} />
          <Route path="/editor" element={<Editor />} />
        </Route>
      </Routes>
    </WikiProvider>
  )
}

export default App