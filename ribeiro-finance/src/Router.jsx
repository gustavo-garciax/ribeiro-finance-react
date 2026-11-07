import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AdicionarGasto from './pages/AdicionarGasto'
import Analises from './pages/Analises'
import Metas from './pages/Metas'
import Configuracoes from './pages/Configuracoes'
import NotFound from './pages/NotFound'
import './Global.css'

export default function Router() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/adicionar" element={<AdicionarGasto />} />
          <Route path="/analises" element={<Analises />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
